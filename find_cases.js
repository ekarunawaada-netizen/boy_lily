const fs = require('fs');
const code = fs.readFileSync('Furina.js', 'utf8').split('\n');

const toFind = ['addsewa', 'delsewa'];

toFind.forEach(k => {
  code.forEach((line, i) => {
    if (line.toLowerCase().includes(`case "${k}"`) || line.toLowerCase().includes(`case '${k}'`)) {
      console.log(`[${k}] line ${i + 1}: ${line.trim()}`);
    }
  });
});
