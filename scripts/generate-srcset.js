#!/usr/bin/env node
/**
 * generate-srcset.js
 *
 * Generates 480w and 960w WebP variants for the images currently wrapped in
 * <picture> elements. Outputs scripts/srcset-widths.json with natural widths.
 *
 * Usage: node scripts/generate-srcset.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const QUALITY = 82;
const WIDTHS = [480, 960];

const TARGET_BASENAMES = [
  // Hero.tsx
  'friendly_doctor_portrait',
  'diverse_doctors_hallway_patient_2',
  'doctor_using_tablet',
  'medical_team_collaboration',
  // AIFeatures.tsx
  'ai_brain_hero',
  'ai_templates_autofill_ui',
  // ComplianceSection
  'secure_data_lock_shield_for_compliance',
  // RCMSection + RCM
  'abstract_medical_financial_growth_chart',
  // Management
  'corporate_leadership_team_meeting',
  // Cardiology
  'diverse_laughing_cardiologists_treating_patient',
  // Dermatology
  'laughing_lady_doctors_treating_patient',
  'smiling_male_dermatologist_with_patient',
  'laser_skin_treatment_procedure',
  'happy_patient_cosmetic_consultation',
  // ClickLessCareMore
  'efficient_doctor_using_technology',
  'healthcare_technology_abstract_concept',
  // Contact
  'medical_team_welcoming_patients',
  // FamilyMedicine
  'diverse_family_doctors_with_family',
  'family_medicine_annual_checkup',
  'family_medicine_health_consultation',
  // OBGYN
  'diverse_obgyn_doctors_with_pregnant_patient',
  'prenatal_ultrasound_examination',
  'obgyn_with_new_mother_and_baby',
  // OurMission
  'healthcare_team_mission_image',
  'caring_doctor_patient_consultation',
  // Pediatrics
  'diverse_pediatricians_examining_child',
  'pediatric_vaccination_procedure',
  'pediatric_growth_assessment',
  // Support
  'medical_support_team_helping',
  // Urology
  'diverse_urologists_consulting_patient',
  'urology_diagnostic_review',
  'urology_team_treatment_planning',
];

// Small-rendered images — generate files for completeness but srcset is skipped
// in the source elements (handled in add-srcset.js)

const DIRS = [
  path.join(ROOT, 'attached_assets/generated_images'),
  path.join(ROOT, 'client/public/assets/generated_images'),
];

const widthMap = {};

async function processInDir(baseName, dir) {
  const pngPath = path.join(dir, `${baseName}.png`);
  if (!fs.existsSync(pngPath)) return;

  const meta = await sharp(pngPath).metadata();
  if (!widthMap[baseName]) widthMap[baseName] = meta.width;

  const fullWebpPath = path.join(dir, `${baseName}.webp`);
  const fullKB = fs.existsSync(fullWebpPath)
    ? Math.round(fs.statSync(fullWebpPath).size / 1024)
    : '?';

  for (const w of WIDTHS) {
    if (w >= meta.width) {
      process.stdout.write(`  SKIP upscale ${w}w (natural=${meta.width}): ${baseName}\n`);
      continue;
    }
    const outPath = path.join(dir, `${baseName}_${w}w.webp`);
    if (fs.existsSync(outPath)) {
      const kb = Math.round(fs.statSync(outPath).size / 1024);
      process.stdout.write(`  EXISTS ${baseName}_${w}w.webp (${kb}KB)\n`);
      continue;
    }
    await sharp(pngPath).resize(w).webp({ quality: QUALITY }).toFile(outPath);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    process.stdout.write(`  GEN  ${baseName}_${w}w.webp  ${kb}KB  (full=${fullKB}KB)\n`);
  }
}

async function main() {
  console.log('\ngenerate-srcset.js\n');

  for (const baseName of TARGET_BASENAMES) {
    console.log(`${baseName}`);
    for (const dir of DIRS) {
      await processInDir(baseName, dir);
    }
  }

  const jsonPath = path.join(__dirname, 'srcset-widths.json');
  fs.writeFileSync(jsonPath, JSON.stringify(widthMap, null, 2));
  console.log(`\nWrote ${jsonPath}`);
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
