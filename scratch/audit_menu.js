const fs = require('fs');
const path = require('path');

async function runAudit() {
    console.log('🔍 Starting Bot Feature Audit...\n');

    // 1. Ambil semua command dari lib/listmenu.js
    const listMenuPath = path.join(process.cwd(), 'lib/listmenu.js');
    const menuContent = fs.readFileSync(listMenuPath, 'utf8');
    // Regex diperbaiki untuk mengambil command murni (tanpa trailing underscore atau spasi)
    const menuCommands = [...menuContent.matchAll(/_\.([a-zA-Z0-9\-]+)/g)].map(m => m[1].replace(/_$/, ''));
    const uniqueMenuCmds = [...new Set(menuCommands)];
    console.log(`📊 Total commands listed in Menu: ${uniqueMenuCmds.length}`);

    // 2. Ambil semua command dari plugins/*.js
    const pluginsDir = path.join(process.cwd(), 'plugins');
    const pluginCmds = new Set();
    fs.readdirSync(pluginsDir).forEach(file => {
        if (file.endsWith('.js')) {
            try {
                const plugin = require(path.join(pluginsDir, file));
                if (plugin.command) {
                    if (Array.isArray(plugin.command)) {
                        plugin.command.forEach(c => pluginCmds.add(c));
                    } else {
                        pluginCmds.add(plugin.command);
                    }
                }
            } catch (e) {}
        }
    });
    console.log(`📦 Total commands in Plugins: ${pluginCmds.size}`);

    // 3. Ambil semua case dari Lily.js
    const lilyPath = path.join(process.cwd(), 'Lily.js');
    const lilyContent = fs.readFileSync(lilyPath, 'utf8');
    const caseRegex = /case\s+['"]([^'"]+)['"]\s*:/g;
    const lilyCases = new Set([...lilyContent.matchAll(caseRegex)].map(m => m[1]));
    console.log(`📜 Total commands (cases) in Lily.js: ${lilyCases.size}`);

    // 4. Bandingkan
    const missing = [];
    uniqueMenuCmds.forEach(cmd => {
        if (!pluginCmds.has(cmd) && !lilyCases.has(cmd)) {
            missing.push(cmd);
        }
    });

    console.log(`\n❌ FOUND ${missing.length} GHOST COMMANDS (Listed in menu but NO LOGIC found):`);
    console.log('--------------------------------------------------');
    
    // Group by category for easier reading (simple approximation)
    const categories = {
        RPG: missing.filter(c => ['fight', 'maling', 'mancing', 'mulung', 'polisi', 'berdagang', 'bunuh', 'casino'].some(k => c.includes(k))),
        AI: missing.filter(c => ['ai', 'gpt', 'openai', 'gemini', 'hercai'].some(k => c.includes(k))),
        Downloader: missing.filter(c => ['dl', 'search', 'mp3', 'mp4', 'tiktok', 'ig'].some(k => c.includes(k))),
        Other: []
    };
    
    const categorized = new Set([...categories.RPG, ...categories.AI, ...categories.Downloader]);
    categories.Other = missing.filter(c => !categorized.has(c));

    for (let cat in categories) {
        if (categories[cat].length > 0) {
            console.log(`\n[ ${cat} ]`);
            console.log(categories[cat].slice(0, 30).join(', ') + (categories[cat].length > 30 ? ' ...' : ''));
        }
    }

    // Save report to artifact
    const report = {
        totalMenu: uniqueMenuCmds.length,
        totalPlugins: pluginCmds.size,
        totalLily: lilyCases.size,
        ghostCount: missing.length,
        ghosts: missing
    };
    fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
}

runAudit();
