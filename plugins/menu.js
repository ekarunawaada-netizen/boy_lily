const fs = require('fs');
const path = require('path');

// Fungsi untuk mengambil semua kategori menu dari lib/listmenu.js
function extractMenuCategories(prefix) {
    try {
        const filePath = path.join(__dirname, '../lib/listmenu.js');
        const raw = fs.readFileSync(filePath, 'utf8');
        const regex = /◤─「[\s\S]*?◣──────────❈/g;
        const matches = raw.match(regex);
        if (!matches) return '';
        const uniqueCategories = new Set();
        matches.forEach(block => {
            let cleanBlock = block
                .replace(/\\`/g, '`')
                .replace(/│⦿/g, '│⟡')
                .replace(/\${prefix}/g, prefix)
                .replace(/\${[\s\S]*?}/g, '');
            uniqueCategories.add(cleanBlock.trim());
        });
        return Array.from(uniqueCategories).join('\n\n');
    } catch (e) {
        return '';
    }
}

module.exports = {
    name: 'menu',
    command: ['menu', 'help', 'allmenu', 'listmenu'],
    category: 'main',
    desc: 'Menampilkan menu bot',

    async run(LilyBot, m, { command, prefix, isOwner, DinzTheCreator, isPrem, totalfitur }) {
        const nama = m.pushName || 'kak';
        const totalCmds = typeof totalfitur === 'function' ? totalfitur() : '567';
        const role = DinzTheCreator ? '👑 ᴅᴇᴠᴇʟᴏᴘᴇʀ' : isOwner ? '👑 ᴏᴡɴᴇʀ' : isPrem ? '💎 ᴘʀᴇᴍɪᴜᴍ' : '👤 ᴜsᴇʀ';

        // ==========================================
        // 1. TAMPILAN KHUSUS .menu (WELCOME MENU)
        // ==========================================
        if (command === 'menu') {
            const welcomeMenu = `ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ ᴅɪ *ʟɪʟʏ - ᴍᴅ* 👋✨

ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ ᴅɪ ᴅᴜɴɪᴀ ᴅɪɢɪᴛᴀʟ *ʟɪʟʏ - ᴍᴅ*,
ʙᴏᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ꜱᴇʀʙᴀɢᴜɴᴀ ʏᴀɴɢ ᴅɪʀᴀɴᴄᴀɴɢ ᴜɴᴛᴜᴋ ᴍᴇᴍᴜᴅᴀʜᴋᴀɴ ᴀᴋᴛɪꜰɪᴛᴀꜱ ᴠɪʀᴛᴜᴀʟᴍᴜ 💫

🎯 ꜰɪᴛᴜʀ ᴜᴛᴀᴍᴀ:
🔹 ᴜɴᴅᴜʜ ᴍᴇᴅɪᴀ 🎞️
🔹 ʙᴇʀᴍᴀɪɴ ɢᴀᴍᴇ 🎮
🔹 ᴘᴇᴍʙᴇʟᴀᴊᴀʀᴀɴ 📚
🔹 ᴛʀᴀɴꜱᴀᴋꜱɪ ᴘᴇɴᴊᴜᴀʟᴀɴ 🛍️
🔹 ᴅᴀɴ ʙᴀɴʏᴀᴋ ꜰɪᴛᴜʀ ᴋᴇʀᴇɴ ʟᴀɪɴɴʏᴀ 🌟

📂 ꜱᴇᴍᴜᴀ ꜰɪᴛᴜʀ ᴛᴇʀᴛᴀᴛᴀ ʀᴀᴘɪ ᴅᴀʟᴀᴍ ᴍᴇɴᴜ ʏᴀɴɢ ᴍᴜᴅᴀʜ ᴅɪᴀᴋꜱᴇꜱ 🧠✨

━━━━━━━━━━━━━━━━━━━
🪪 ʏᴏᴜʀ ꜱᴛᴀᴛᴜꜱ:
( ${role} )
━━━━━━━━━━━━━━━━━━━

⚠️ ʙᴏᴛ ɪɴɪ ꜱᴇᴅᴀɴɢ ᴅɪᴋᴇᴍʙᴀɴɢᴋᴀɴ.
ᴊɪᴋᴀ ᴛᴇʀᴊᴀᴅɪ ʙᴜɢ ᴀᴛᴀᴜ ᴋᴇꜱᴀʟᴀʜᴀɴ, ᴍᴏʜᴏɴ ᴘᴇɴɢᴇʀᴛɪᴀɴ 🙏
ᴅᴜᴋᴜɴɢᴀɴᴍᴜ ꜱᴀɴɢᴀᴛ ʙᴇʀᴀʀᴛɪ ʙᴀɢɪ ᴋᴀᴍɪ ❤️

📩 ᴊɪᴋᴀ ᴍᴇɴᴇᴍᴜᴋᴀɴ ʙᴜɢ, ʜᴜʙᴜɴɢɪ ᴏᴡɴᴇʀ ʙᴏᴛ 🤝

━━━━━━━━━━━━━━━━━━━

💡 *ᴛɪᴘꜱ:* ᴋᴇᴛɪᴋ *.ᴀʟʟᴍᴇɴᴜ* ᴜɴᴛᴜᴋ ᴍᴇʟɪʜᴀᴛ ꜱᴇᴍᴜᴀ ᴅᴀꜰᴛᴀʀ ᴘᴇʀɪɴᴛᴀʜ.`;

            return await LilyBot.sendMessage(m.chat, {
                text: welcomeMenu,
                contextInfo: {
                    externalAdReply: {
                        title: `ʟɪʟʏ - ᴍᴅ • ᴡᴇʟᴄᴏᴍᴇ ✨`,
                        body: `Tap di sini untuk melihat semua fitur`,
                        thumbnailUrl: global.thumbnail || 'https://files.catbox.moe/yng1lr.jpg',
                        sourceUrl: global.linkSaluran || 'https://whatsapp.com',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        }

        // ==========================================
        // 2. TAMPILAN .allmenu (LIST LENGKAP)
        // ==========================================
        const startTime = Date.now();
        const up = process.uptime();
        const h = Math.floor(up / 3600);
        const mn = Math.floor((up % 3600) / 60);
        const s = Math.floor(up % 60);
        const rtStr = h > 0 ? `${h} hour, ${mn} minute` : mn > 0 ? `${mn} minute, ${s} seconds` : `${s} seconds`;
        const responseTime = (Date.now() - startTime).toFixed(2);

        const header = `🌟 *ʜᴀɪ ᴋᴀᴋ ${nama} 🎗️*
ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ ᴅɪ *ʟɪʟʏ - ᴍᴅ* 💫

┏━━━❏ *ɪɴꜰᴏ ᴜꜱᴇʀ* ❏━━━┓
╰⊹ 💁‍♀️ ɴᴀᴍᴀ : ${nama}
╰⊹ 🎖️ ʀᴏʟᴇ : ${role.replace(/👑 |💎 |👤 /g, '')}
╰⊹ 🌐 ᴍᴏᴅᴇ : ${LilyBot.public ? 'ᴘᴜʙʟɪᴄ' : 'sᴇʟꜰ'}
╰⊹ 🧑‍💻 ᴀᴜᴛʜᴏʀ : ${global.ownername || 'KaaPhiww'} | ᴅᴇᴠ
┗━━━━━━━━━━━━━━━┛

┏━━━❏ *ɪɴꜰᴏ ʙᴏᴛ* ❏━━━┓
╰⊹ ⏱️ ʀᴜɴᴛɪᴍᴇ : ${rtStr}
╰⊹ 📦 ᴠᴇʀꜱɪ : ${global.version || '1.1.0'}
╰⊹ ⚡ ʀᴇꜱᴘᴏɴ : ${responseTime} ms
╰⊹ 📊 ᴛᴏᴛᴀʟ ꜰɪᴛᴜʀ : ${totalCmds}
┗━━━━━━━━━━━━━━━┛

❗ *ᴊᴀɴɢᴀɴ ᴅɪꜱᴘᴀᴍ ʏᴀ ᴋᴀᴋ 💛*
ᴀɢᴀʀ ʙᴏᴛ ʙɪꜱᴀ ᴀᴋᴛɪꜰ 24 ᴊᴀᴍ & ᴛɪᴅᴀᴋ ᴋᴇᴛᴇʀᴅᴇᴛᴇᴋꜱɪ ꜱᴘᴀᴍ 🍁


`;

        let menuBody = extractMenuCategories(prefix);

        if (!isOwner && !DinzTheCreator) {
            const ownerMenuStart = menuBody.indexOf('◤─「 `OWNER MENU`');
            const ownerMenuEnd = menuBody.indexOf('◣──────────❈', ownerMenuStart) + 12;
            if (ownerMenuStart !== -1 && ownerMenuEnd !== -1) {
                menuBody = menuBody.slice(0, ownerMenuStart) + menuBody.slice(ownerMenuEnd);
            }
        }

        const footer = `\n\n© *Lily* - LilyMD`;
        const fullText = header + menuBody + footer;

        await LilyBot.sendMessage(m.chat, {
            text: fullText,
            contextInfo: {
                externalAdReply: {
                    title: `ʟɪʟʏ - ᴍᴅ ✨`,
                    body: `Total ${totalCmds} Fitur Tersedia`,
                    thumbnailUrl: global.thumbnail || 'https://files.catbox.moe/yng1lr.jpg',
                    sourceUrl: global.linkSaluran || 'https://whatsapp.com',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }
};
