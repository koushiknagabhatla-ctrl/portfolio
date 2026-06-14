const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, 'public', 'about');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC4764 (1).jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC3829.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp/_DSC4621.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp/DSC01220.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp2/DSC01619.jpg",
  "C:/Users/koush/OneDrive/Desktop/pfp2/DSC_1459 (1).jpg"
];

async function run() {
  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const outName = `landscape_${i + 1}.webp`;
    const outPath = path.join(outDir, outName);
    
    try {
      await sharp(filePath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);
      console.log(`Saved ${outName}`);
    } catch(e) {
      console.error(`Failed ${filePath}`, e.message);
    }
  }
}
run();
