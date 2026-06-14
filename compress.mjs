import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './src/assets/pfp';

async function compressImages() {
  const files = fs.readdirSync(dir);
  let totalSaved = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.JPG'].includes(ext)) {
      const filePath = path.join(dir, file);
      const newFileName = file.replace(ext, '.webp');
      const newFilePath = path.join(dir, newFileName);
      
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;

      console.log(`Processing: ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);
      
      try {
        await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ lossless: false, quality: 80, effort: 6 })
          .toFile(newFilePath + '.tmp'); // Write to tmp first to avoid conflicts
          
        const newStats = fs.statSync(newFilePath + '.tmp');
        const newSize = newStats.size;
        
        // Delete original and move tmp to final
        fs.unlinkSync(filePath);
        fs.renameSync(newFilePath + '.tmp', newFilePath);
        
        totalSaved += (originalSize - newSize);
        console.log(`✅ Saved ${( (originalSize - newSize) / 1024 / 1024 ).toFixed(2)} MB`);
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
      }
    }
  }
  
  console.log(`\n🎉 Compression complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

compressImages();
