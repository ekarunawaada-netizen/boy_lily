const { Canvas, loadImage, FontLibrary } = require('skia-canvas');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

// Register the handwritten font
const fontPath = path.join(process.cwd(), 'src', 'nulis', 'font', 'Indie-Flower.ttf');
if (fs.existsSync(fontPath)) {
    FontLibrary.use("Handwritten", fontPath);
}

// Utility to wrap text
function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    for (const word of words) {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

module.exports = {
    name: 'nulis',
    command: ['nulis', 'magernulis', 'tulis'],
    category: 'tools',
    desc: 'Generate tulisan tangan di kertas',
    async run(LilyBot, m, { text, prefix, command, replyviex }) {
        if (!text) {
            return m.reply(`⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n> \`${prefix + command} <teks>\`\n\n> Contoh:\n> \`${prefix + command} Aku cinta kamu selamanya\``);
        }

        if (text.length > 500) {
            return m.reply(`❌ *ᴛᴇᴋs ᴛᴇʀʟᴀʟᴜ ᴘᴀɴᴊᴀɴɢ*\n\n> Maksimal 500 karakter`);
        }

        const inputPath = path.join(process.cwd(), 'src', 'nulis', 'images', 'buku', 'sebelumkiri.jpg');
        if (!fs.existsSync(inputPath)) {
            return m.reply(`❌ *ᴛᴇᴍᴘʟᴀᴛᴇ ᴛɪᴅᴀᴋ ᴀᴅᴀ*\n\n> File template tidak ditemukan di sistem.`);
        }

        await m.react('🕒');

        try {
            const bgImage = await loadImage(inputPath);
            const canvas = new Canvas(bgImage.width, bgImage.height);
            const ctx = canvas.getContext("2d");
            
            // Draw background
            ctx.drawImage(bgImage, 0, 0);

            // Date & Day
            const tgl = moment().tz('Asia/Jakarta').format('DD/MM/YYYY');
            const hari = moment().tz('Asia/Jakarta').locale('id').format('dddd');

            // Text configuration (Adjusted for sebelumkiri.jpg)
            ctx.font = "23px Handwritten";
            ctx.fillStyle = "#1a1a2e";

            // Draw Date & Day
            ctx.fillText(hari, 210, 140); 
            ctx.fillText(tgl, 210, 165);

            // Draw Main Text
            const maxWidth = 700;
            const lineHeight = 30;
            const startX = 140;
            const startY = 210;

            const lines = wrapText(ctx, text, maxWidth);
            lines.forEach((line, i) => {
                if (i < 25) { // Limit to one page for now
                    ctx.fillText(line, startX, startY + (i * lineHeight));
                }
            });

            const buffer = await canvas.toBuffer("png");
            
            await m.react('✅');
            await LilyBot.sendMessage(m.chat, {
                image: buffer,
                caption: `✅ *ᴛᴜʟɪsᴀɴ ᴛᴀɴɢᴀɴ*\n\n> Hati-hati ketahuan! 📖\n\n_${global.wm}_`,
                contextInfo: {
                    externalAdReply: {
                        title: "Handwriting Generator",
                        body: "Lily Assistant",
                        thumbnailUrl: "https://img1.pixhost.to/images/8859/642894040_lily.jpg",
                        sourceUrl: "https://whatsapp.com/channel/0029Vb7WoIXJf05c6lVZxD2X",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });

        } catch (error) {
            console.error('[NULIS ERROR]', error);
            await m.react('❌');
            m.reply(`❌ *ERROR*\n\nTerjadi kesalahan saat memproses gambar.`);
        }
    }
};
