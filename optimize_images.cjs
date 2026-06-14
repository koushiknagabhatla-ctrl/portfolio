const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIRS = [
  'C:\\Users\\koush\\OneDrive\\Desktop\\pfp',
  'C:\\Users\\koush\\OneDrive\\Desktop\\pfp2'
];
const OUT_DIR = path.join(__dirname, 'public', 'about');

// Ensure output directory exists and is empty
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

async function optimizeImages() {
  let imagesFound = 0;
  
  for (const dir of SOURCE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
      
      const filePath = path.join(dir, file);
      try {
        const metadata = await sharp(filePath).metadata();
        
        // Filter for Landscape (width > height)
        if (metadata.width > metadata.height) {
          imagesFound++;
          const outName = `landscape_${imagesFound}.webp`;
          const outPath = path.join(OUT_DIR, outName);
          
          await sharp(filePath)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outPath);
            
          console.log(`Optimized ${file} -> ${outName}`);
          
          // Stop after 6 good landscape images
          if (imagesFound >= 6) {
            console.log('Successfully optimized 6 landscape images.');
            return;
          }
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }
}

optimizeImages().catch(console.error);
