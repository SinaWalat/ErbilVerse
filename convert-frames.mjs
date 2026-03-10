import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './public/hero-frames';
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));

async function processFiles() {
  let count = 0;
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace('.jpg', '.webp'));
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    // Optionally delete the old jpg to save space
    // fs.unlinkSync(inputPath);
    count++;
    if (count % 50 === 0) console.log(`Converted ${count}/${files.length} frames...`);
  }
  console.log('Finished converting all frames to WebP.');
}

processFiles().catch(console.error);
