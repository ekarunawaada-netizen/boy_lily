const fs = require('fs');
const code = fs.readFileSync('Furina.js', 'utf8').split('\n');
const missing = ['upchv2', 'delwa', 'gconly', 'bcvideo', 'savekontakv', 'jeda', 'savekontak'];

console.log("Checking missing features in Furina.js...");
missing.forEach(k => {
  let found = false;
  code.forEach((line, i) => {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('case') && lowerLine.includes(k)) {
      console.log(`[${k}] line ${i + 1}: ${line.trim()}`);
      found = true;
    }
  });
  if (!found) {
    console.log(`[${k}] No occurrences found in case statements.`);
  }
});
