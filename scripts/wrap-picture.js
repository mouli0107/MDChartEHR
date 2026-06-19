#!/usr/bin/env node
/**
 * wrap-picture.js
 * Adds WebP imports and wraps <img> tags that use @assets/generated_images/*.png
 * in <picture> elements with WebP <source> + PNG fallback.
 *
 * Uses character-level scanning instead of regex for img tag boundaries,
 * so it can never match across multiple <img> elements.
 *
 * Usage: node scripts/wrap-picture.js [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const FILES = [
  'client/src/components/ComplianceSection.tsx',
  'client/src/components/RCMSection.tsx',
  'client/src/pages/Management.tsx',
  'client/src/pages/RCM.tsx',
  'client/src/pages/CardiologySpecialty.tsx',
  'client/src/pages/DermatologySpecialty.tsx',
  'client/src/pages/ClickLessCareMore.tsx',
  'client/src/pages/Contact.tsx',
  'client/src/pages/EHR.tsx',
  'client/src/pages/FamilyMedicineSpecialty.tsx',
  'client/src/pages/OBGYNSpecialty.tsx',
  'client/src/pages/OurMission.tsx',
  'client/src/pages/PediatricsSpecialty.tsx',
  'client/src/pages/Support.tsx',
  'client/src/pages/UrologySpecialty.tsx',
];

/**
 * Find all <img ... /> tags in content.
 * Returns array of { start, end, raw, indent } where:
 *   start = index of first char of leading whitespace on the <img line
 *   end   = index AFTER the closing />
 *   raw   = the full text including indent and />
 *   attrs = the text between <img and />
 *   indent = leading whitespace string
 */
function findImgTags(content) {
  const tags = [];
  let i = 0;
  while (i < content.length) {
    const imgIdx = content.indexOf('<img', i);
    if (imgIdx === -1) break;

    // Only match if next char after <img is whitespace or / or > (proper tag, not e.g. <image)
    const afterImg = content[imgIdx + 4];
    if (afterImg !== ' ' && afterImg !== '\n' && afterImg !== '\r' && afterImg !== '\t' && afterImg !== '/' && afterImg !== '>') {
      i = imgIdx + 4;
      continue;
    }

    // Find the leading whitespace on this line (walk back to start of line)
    let lineStart = imgIdx;
    while (lineStart > 0 && content[lineStart - 1] !== '\n') lineStart--;
    const indent = content.slice(lineStart, imgIdx);
    // Only count as indent if it's all spaces/tabs
    const isIndent = /^[ \t]*$/.test(indent);

    // Scan forward to find the closing /> of this img tag
    // We track string state to avoid being fooled by /> inside attribute values
    let j = imgIdx + 4;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inBrace = 0;
    let found = false;
    while (j < content.length) {
      const ch = content[j];
      if (inDoubleQuote) {
        if (ch === '"' && content[j-1] !== '\\') inDoubleQuote = false;
      } else if (inSingleQuote) {
        if (ch === "'" && content[j-1] !== '\\') inSingleQuote = false;
      } else if (inBrace > 0) {
        if (ch === '{') inBrace++;
        else if (ch === '}') inBrace--;
      } else {
        if (ch === '"') inDoubleQuote = true;
        else if (ch === "'") inSingleQuote = true;
        else if (ch === '{') inBrace++;
        else if (ch === '/' && content[j+1] === '>') {
          // Found />
          const end = j + 2;
          const raw = content.slice(isIndent ? lineStart : imgIdx, end);
          const attrs = content.slice(imgIdx + 4, j);
          tags.push({
            start: isIndent ? lineStart : imgIdx,
            end,
            raw,
            attrs,
            indent: isIndent ? indent : '',
            imgStart: imgIdx,
          });
          found = true;
          i = end;
          break;
        }
      }
      j++;
    }
    if (!found) i = imgIdx + 4;
  }
  return tags;
}

function processFile(filePath) {
  const fullPath = path.join(ROOT, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  // ── Step 1: collect generated_images PNG imports ──
  const importRe = /^(import (\w+) from "@assets\/generated_images\/(.+?)\.png";)$/gm;
  const imageVars = new Map(); // varName → { baseName, fullImport }
  let m;
  while ((m = importRe.exec(content)) !== null) {
    imageVars.set(m[2], { baseName: m[3], fullImport: m[1] });
  }

  if (imageVars.size === 0) {
    console.log(`  SKIP (no generated_images imports): ${filePath}`);
    return;
  }

  // ── Step 2: add WebP imports after each PNG import ──
  for (const [varName, { baseName, fullImport }] of imageVars) {
    const webpLine = `import ${varName}Webp from "@assets/generated_images/${baseName}.webp";`;
    if (!content.includes(webpLine)) {
      content = content.replace(fullImport, `${fullImport}\n${webpLine}`);
    }
  }

  // ── Step 3: wrap <img src={varName}…/> in <picture> ──
  // We find all img tags, then process from back to front (so indices stay valid)
  const imgTags = findImgTags(content);

  // Work from the end so that replacing earlier tags doesn't shift later indices
  for (let idx = imgTags.length - 1; idx >= 0; idx--) {
    const tag = imgTags[idx];
    // Which varName does this img use?
    let matchedVar = null;
    for (const [varName] of imageVars) {
      if (tag.attrs.includes(`src={${varName}}`)) {
        matchedVar = varName;
        break;
      }
    }
    if (!matchedVar) continue;

    // Skip if already wrapped
    const before = content.slice(Math.max(0, tag.start - 60), tag.start);
    if (before.includes('<picture>')) continue;

    const webpSource = `<source srcSet={${matchedVar}Webp} type="image/webp" />`;
    const ind = tag.indent;
    const imgPart = `<img${tag.attrs}/>`;
    const replacement = `${ind}<picture>\n${ind}  ${webpSource}\n${ind}  ${imgPart}\n${ind}</picture>`;

    content = content.slice(0, tag.start) + replacement + content.slice(tag.end);
  }

  if (content === original) {
    console.log(`  NO CHANGE: ${filePath}`);
    return;
  }

  if (!DRY_RUN) {
    fs.writeFileSync(fullPath, content);
    const wraps = (content.match(/<picture>/g) || []).length;
    console.log(`  UPDATED: ${filePath} (${wraps} picture wrappers)`);
  } else {
    const lines = content.split('\n');
    let printed = 0;
    console.log(`  [DRY-RUN] ${filePath}`);
    lines.forEach((line, i) => {
      if ((line.includes('<picture>') || line.includes('<source srcSet=') || line.includes('</picture>') || line.includes('Webp')) && printed < 30) {
        console.log(`    L${i+1}: ${line.trim()}`);
        printed++;
      }
    });
  }
}

console.log(`\nwrap-picture.js${DRY_RUN ? ' [DRY-RUN]' : ''}\n`);
for (const f of FILES) {
  try {
    processFile(f);
  } catch (err) {
    console.error(`  ERROR in ${f}: ${err.message}`);
  }
}
console.log('\nDone.');
