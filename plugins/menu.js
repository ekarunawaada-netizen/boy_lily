const os = require('os');
const moment = require('moment-timezone');

module.exports = {
    name: 'menu',
    command: ['menu', 'help', 'allmenu'],
    category: 'main',
    desc: 'Menampilkan daftar perintah bot',
    async run(DinzBotz, m, { prefix, isOwner, runtime }) {
        let plugins = global.plugins || {};
        
        // Grouping
        let categories = {};
        for (let name in plugins) {
            let plugin = plugins[name];
            if (!plugin || !plugin.name) continue;
            
            let cat = (plugin.category || 'UNCATEGORIZED').toLowerCase();
            
            // Filter owner
            if (cat === 'owner' && !isOwner) continue;

            if (!categories[cat]) categories[cat] = [];
            
            let cmdList = [];
            if (plugin.command && Array.isArray(plugin.command)) {
                cmdList = plugin.command;
            } else if (plugin.name) {
                cmdList = [plugin.name];
            }
            
            categories[cat].push({
                name: plugin.name,
                commands: cmdList,
                desc: plugin.desc || ''
            });
        }
        
        // Sorting categories
        let keys = Object.keys(categories).sort();
        
        let teks = `🌟 *Halo ${m.pushName || 'Kak'}!* 🌟\nSelamat datang di Furina-MD!\n\n`;
        
        // Waktu real-time dan RAM
        const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
        const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const ramFree = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const ramUsage = (ramTotal - ramFree).toFixed(2);

        teks += `┏━━━❏ *INFO SISTEM* ❏━━━┓\n`;
        teks += `╰⊹ 🕒 Waktu: ${time}\n`;
        teks += `╰⊹ 📅 Tanggal: ${date}\n`;
        teks += `╰⊹ 💾 RAM: ${ramUsage} GB / ${ramTotal} GB\n`;
        teks += `╰⊹ ⏱️ Runtime: ${runtime ? runtime(process.uptime()) : 'N/A'}\n`;
        teks += `┗━━━━━━━━━━━━━━━┛\n\n`;
        
        // Menu List
        for (let cat of keys) {
            teks += `╭─「 *${cat.toUpperCase()} MENU* 」─✦\n`;
            
            // Sort commands alphabetically
            let sortedPlugins = categories[cat].sort((a, b) => a.name.localeCompare(b.name));
            
            for (let plug of sortedPlugins) {
                let primaryCommand = plug.commands.length > 0 ? plug.commands[0] : plug.name;
                teks += `│ ✦ ${prefix}${primaryCommand}\n`;
            }
            teks += `╰─────────────────✦\n\n`;
        }
        
        // Database Stats (Total User)
        let dbUsers = global.db && global.db.users ? Object.keys(global.db.users).length : 0;

        teks += `┏━━━❏ *DATABASE STATS* ❏━━━┓\n`;
        teks += `╰⊹ 👥 Total User: ${dbUsers}\n`;
        teks += `┗━━━━━━━━━━━━━━━┛\n`;
        
        await DinzBotz.sendMessage(m.chat, { 
            text: teks,
            contextInfo: {
                externalAdReply: {
                    title: "𝐅𝐮𝐫𝐢𝐧𝐚 - 𝐌𝐃",
                    body: "Dynamic Menu System",
                    thumbnailUrl: "https://files.catbox.moe/l6uxfw.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb7WoIXJf05c6lVZxD2X",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }
}
