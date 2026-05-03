const fs = require('fs');
const lines = fs.readFileSync('Furina.js', 'utf8').split('\n');
lines.forEach((line, i) => {
    if (line.includes('case \'allmenu\'') || line.includes('case "allmenu"') || line.includes('case \'menu\'') || line.includes('case "menu"')) {
        console.log((i + 1) + ': ' + line.trim().substring(0, 100));
    }
});
