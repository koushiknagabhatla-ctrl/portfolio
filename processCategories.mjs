import fs from 'fs';

// Read the original file manually (as string)
const content = fs.readFileSync('./src/components/imageCategories.js', 'utf8');

// Use regex to extract the object
const match = content.match(/export const imageCategories = (\{[\s\S]*?\});/);
if (!match) {
  console.error("Could not parse imageCategories.js");
  process.exit(1);
}

const objStr = match[1];
const imageCategories = (new Function('return ' + objStr))();

const newMapping = {};

for (const [img, cats] of Object.entries(imageCategories)) {
  // We want EXACTLY ONE category.
  // Priority: faces > bikes > nature > recents
  let finalCat = 'recents';
  
  // Custom heuristics for prominent subjects
  if (cats.includes('people') && cats.includes('bike')) {
    // If it's a portrait on a bike, bikes is usually the primary focus of motorcycling photography
    finalCat = 'bikes'; 
  } else if (cats.includes('people')) {
    finalCat = 'faces';
  } else if (cats.includes('bike')) {
    finalCat = 'bikes';
  } else if (cats.includes('nature')) {
    finalCat = 'nature';
  } else {
    finalCat = 'recents';
  }
  
  newMapping[img] = [finalCat];
}

// Ensure Recents page has ALL photos
// Wait, the user said "if photos are included twice, remove other!"
// Does that mean even "Recents" is mutually exclusive?
// Usually Recents means "All recent photos". Let's strictly keep them mutually exclusive as requested.

const outputStr = `export const imageCategories = ${JSON.stringify(newMapping, null, 2)};\n`;
fs.writeFileSync('./src/components/imageCategories.js', outputStr);
console.log("Rewrote imageCategories.js successfully.");
