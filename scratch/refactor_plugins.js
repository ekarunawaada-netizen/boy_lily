const fs = require('fs');
const path = require('path');
const pluginsDir = 'c:/Users/ekaru/OneDrive/Desktop/FURINA X LILY/plugins';

fs.readdirSync(pluginsDir).forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(pluginsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Rename Bot instance
        content = content.replace(/LilyBot/g, 'LilyBot');

        // 2. Remove old DB requires
        content = content.replace(/const\s+db\s+=\s+require\(['"](\.\.\/)*lib\/db['"]\)/g, '// Migrated to global.db');
        content = content.replace(/const\s+mongoDb\s+=\s+require\(['"](\.\.\/)*lib\/db['"]\)/g, '// Migrated to global.db');

        // 3. Fix getUser calls
        content = content.replace(/db\.getUser\(([^)]+)\)/g, 'global.db.users[$1]');
        content = content.replace(/mongoDb\.getUser\(([^)]+)\)/g, 'global.db.users[$1]');

        // 4. Fix updateUser calls (Simplified, might need more care)
        content = content.replace(/db\.updateUser\(([^,]+),\s*([^)]+)\)/g, 'Object.assign(global.db.users[$1], $2)');
        content = content.replace(/mongoDb\.updateUser\(([^,]+),\s*([^)]+)\)/g, 'Object.assign(global.db.users[$1], $2)');

        fs.writeFileSync(filePath, content);
    }
});
console.log('Successfully refactored plugins.');
