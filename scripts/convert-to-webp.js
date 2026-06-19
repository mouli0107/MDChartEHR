#!/usr/bin/env node
/**
 * convert-to-webp.js
 *
 * Converts PNG images to WebP alongside the originals (no originals deleted).
 * Usage:
 *   node scripts/convert-to-webp.js            # convert ALL PNGs in the image dirs
 *   node scripts/convert-to-webp.js --pilot     # convert only the 6 pilot images
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const QUALITY = 82; // 80-85 range per requirements

const IMAGE_DIRS = [
  path.join(ROOT, 'client/public/assets/generated_images'),
  path.join(ROOT, 'attached_assets/generated_images'),
];

// The 6 images flagged in the audit (missing loading attr)
const PILOT_FILES = [
  'friendly_doctor_portrait.png',
  'medical_team_collaboration.png',
  'doctor_using_tablet.png',
  'diverse_doctors_hallway_patient_2.png',
  'ai_brain_hero.png',
  'ai_templates_autofill_ui.png',
];

async function convertFile(inputPath) {
  const outputPath = inputPath.replace(/\.png$/i, '.webp');
  if (fs.existsSync(outputPath)) {
    console.log(`  SKIP (exists): ${path.basename(outputPath)}`);
    return { skipped: true };
  }
  const statBefore = fs.statSync(inputPath).size;
  await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
  const statAfter = fs.statSync(outputPath).size;
  const savings = Math.round((1 - statAfter / statBefore) * 100);
  console.log(
    `  OK: ${path.basename(inputPath)} → ${path.basename(outputPath)}` +
    `  (${Math.round(statBefore / 1024)}KB → ${Math.round(statAfter / 1024)}KB, -${savings}%)`
  );
  return { inputPath, outputPath, statBefore, statAfter, savings };
}

async function main() {
  const isPilot = process.argv.includes('--pilot');
  console.log(`\nWebP conversion — quality ${QUALITY}${isPilot ? ' [PILOT: 6 images]' : ' [ALL]'}\n`);

  let totalBefore = 0, totalAfter = 0, count = 0;

  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`DIR NOT FOUND: ${dir}`);
      continue;
    }
    const files = fs.readdirSync(dir)
      .filter(f => f.toLowerCase().endsWith('.png'))
      .filter(f => !isPilot || PILOT_FILES.includes(f));

    if (isPilot && files.length === 0) {
      console.log(`No pilot files found in ${dir}`);
      continue;
    }

    console.log(`Directory: ${dir} (${files.length} files)`);

    for (const file of files) {
      const result = await convertFile(path.join(dir, file));
      if (!result.skipped) {
        totalBefore += result.statBefore;
        totalAfter += result.statAfter;
        count++;
      }
    }
  }

  if (count > 0) {
    const totalSavings = Math.round((1 - totalAfter / totalBefore) * 100);
    console.log(`\nConverted ${count} files`);
    console.log(`  Total: ${Math.round(totalBefore / 1024 / 1024 * 10) / 10}MB → ${Math.round(totalAfter / 1024 / 1024 * 10) / 10}MB (-${totalSavings}%)`);
  } else {
    console.log('\nNo files converted (all already exist or none matched).');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
