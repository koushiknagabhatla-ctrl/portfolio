const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'components', 'photoDatabase.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Remove bikes_40.webp from people array
db.people = db.people.filter(file => file !== '/photography/bikes_40.webp');

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Successfully removed bikes_40.webp from the people array!');
