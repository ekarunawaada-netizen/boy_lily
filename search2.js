const fs = require('fs');
const path = require('path');
const resultFile = 'brat_search_result.txt';
let output = '';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes('brat')) {
          output += `[${fullPath}:${i + 1}] ${lines[i]}\n`;
        }
      }
    }
  }
}

searchDir(__dirname);
fs.writeFileSync(resultFile, output);
