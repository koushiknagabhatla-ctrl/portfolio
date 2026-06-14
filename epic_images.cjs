const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, 'public', 'about');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Selecting the absolute highest quality, massive files from the desktop to ensure epic visuals
const images = [
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC3834.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC4621.jpg", 
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC2823.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC4192.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC4024.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp2/IMG_20250330_172027.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp2/DSC01619.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp2/DSC_1459 (1).jpg"
];

async function run() {
  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const outName = `epic_${i + 1}.webp`;
    const outPath = path.join(outDir, outName);
    
    try {
      await sharp(filePath)
        .resize({ width: 2000, withoutEnlargement: true })
        .webp({ quality: 90 }) // Higher quality for cinematic feel
        .toFile(outPath);
      console.log(`Saved ${outName}`);
    } catch(e) {
      console.error(`Failed ${filePath}`, e.message);
    }
  }
}
run();
