#!/usr/bin/env node

/**
 * PWA Icon Generator Script
 * 
 * This script creates placeholder icons for PWA.
 * For production, replace these with properly designed icons.
 * 
 * To use this script:
 * 1. Place your base icon (512x512) as icon-512x512.png in public/icons/
 * 2. Install sharp: pnpm add -D sharp
 * 3. Run: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const publicDir = path.join(__dirname, '..', 'public', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const baseIconPath = path.join(publicDir, 'icon-512x512.png');

// Check if base icon exists
if (!fs.existsSync(baseIconPath)) {
  console.error('❌ Base icon (icon-512x512.png) not found in public/icons/');
  console.log('Please create or add a 512x512 icon first.');
  console.log('\nAlternatively, you can use an online tool like:');
  console.log('- https://www.pwabuilder.com/imageGenerator');
  console.log('- https://realfavicongenerator.net/');
  process.exit(1);
}

async function generateIcons() {
  console.log('🎨 Generating PWA icons...\n');

  for (const size of sizes) {
    const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(baseIconPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate icon-${size}x${size}.png:`, error.message);
    }
  }

  console.log('\n✨ Icon generation complete!');
}

generateIcons().catch(console.error);
