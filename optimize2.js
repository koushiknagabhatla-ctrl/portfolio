import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'src', 'assets', 'projects');

async function optimizeImages() {
  if (!fs.existsSync(assetsDir)) return;
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(assetsDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      console.log(`Optimizing ${file}...`);
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`Saved ${outputPath}`);
      
      // Delete the original
      fs.unlinkSync(inputPath);
    }
  }
}

optimizeImages().catch(console.error);
