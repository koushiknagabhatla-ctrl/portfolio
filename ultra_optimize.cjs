const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, 'public', 'about');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const dirs = [
  "C:/Users/koush/OneDrive/Desktop/pfp",
  "C:/Users/koush/OneDrive/Desktop/pfp2"
];

let allFiles = [];
dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));
    files.forEach(f => {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      allFiles.push({ path: fullPath, size: stat.size });
    });
  }
});

// Sort by size descending to get the highest resolution/quality shots
allFiles.sort((a, b) => b.size - a.size);
const topFiles = allFiles.slice(0, 14);

async function run() {
  console.log(`Found ${topFiles.length} epic images. Optimizing for 0 lag...`);
  
  for (let i = 0; i < topFiles.length; i++) {
    const filePath = topFiles[i].path;
    const outName = `ultra_${i + 1}.webp`;
    const outPath = path.join(outDir, outName);
    
    try {
      // 1600px is the sweet spot for edge-to-edge desktop without massive GPU memory overhead
      await sharp(filePath)
        .resize({ width: 1600, withoutEnlargement: true })
        // High quality (85) but max effort (6) for extreme compression efficiency = fast load, no lag
        .webp({ quality: 85, effort: 6 }) 
        .toFile(outPath);
      console.log(`Saved ${outName} (${(topFiles[i].size / 1024 / 1024).toFixed(2)}MB original)`);
    } catch(e) {
      console.error(`Failed ${filePath}`, e.message);
    }
  }
  console.log("All images ultra-optimized successfully.");
}

run();
