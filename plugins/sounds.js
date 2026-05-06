module.exports = {
    name: 'sounds',
    command: [], // We'll populate this dynamically or use a regex in the dispatcher
    category: 'other',
    desc: 'Memainkan berbagai suara/musik lucu',
    async run(LilyBot, m, { command, text, isRegistered, replydaftar }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        let viot = "https://telegra.ph/file/48b67f699cfa231e4d5c2.jpg";
        let sound;
        
        if (/sound/.test(command)) {
            sound = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`;
        } else if (/mangkane/.test(command)) {
            let num = parseInt(command.replace('mangkane', ''));
            if (num < 25) {
                sound = `https://raw.githubusercontent.com/hyuura/Rest-Sound/main/HyuuraKane/${command}.mp3`;
            } else {
                sound = `https://raw.githubusercontent.com/aisyah-rest/mangkane/main/Mangkanenya/${command}.mp3`;
            }
        } else if (/acumalaka|reza-kecap|farhan-kebab|omaga|kamu-nanya|anjay|siuu/.test(command)) {
            sound = `https://github.com/FahriAdison/Base-Sound/raw/main/audio/${command}.mp3`;
        }

        if (!sound) return;

        if (text && text.toLowerCase() === 'thumb') {
            await LilyBot.sendMessage(m.chat, {
                audio: { url: sound },
                mimetype: 'audio/mpeg',
                ptt: false,
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: "https://instagram.com/Cyaa_ches1",
                        mediaType: 2,
                        title: "  ⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻  ",
                        body: "  ━━━━⬤──────────  ",
                        description: "Now Playing...",
                        thumbnailUrl: viot,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } else {
            await LilyBot.sendMessage(m.chat, {
                audio: { url: sound },
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: m });
        }
    }
}

// Add the massive list of commands
const commands = [];
for (let i = 1; i <= 161; i++) commands.push(`sound${i}`);
for (let i = 1; i <= 54; i++) commands.push(`mangkane${i}`);
commands.push('acumalaka', 'reza-kecap', 'farhan-kebab', 'omaga', 'kamu-nanya', 'anjay', 'siuu');
module.exports.command = commands;
