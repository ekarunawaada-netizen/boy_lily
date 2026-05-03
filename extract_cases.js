const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('Furina.js', 'utf8');
const lines = content.split('\n');
const cases = [];

lines.forEach((line, i) => {
    const match = line.match(/case\s+['"]([^'"]+)['"]\s*:/);
    if (match) {
        cases.push({ line: i + 1, cmd: match[1] });
    }
});

fs.writeFileSync('all_cases.json', JSON.stringify(cases, null, 2));
console.log(`Found ${cases.length} cases.`);
