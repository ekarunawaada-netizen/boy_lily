const fs = require('fs');
const path = require('path');
// Migrated to global.db;

// Path ke folder data games
const DATA_PATH = path.join(__dirname, '../data update games');

// Konfigurasi Game (Nama Command: Nama File JSON)
const GAMES_CONFIG = {
    'tebakhewan': { file: 'tebakhewan.json', reward: 5000, xp: 50 },
    'tebakgambar': { file: 'tebakgambar.json', reward: 8000, xp: 100, isImage: true },
    'tebakkata': { file: 'tebakkata.json', reward: 4000, xp: 40 },
    'tebakkalimat': { file: 'tebakkalimat.json', reward: 5000, xp: 50 },
    'tebaklirik': { file: 'tebaklirik.json', reward: 6000, xp: 60 },
    'tebaktebakan': { file: 'tebaktebakan.json', reward: 3000, xp: 30 },
    'tebakbendera': { file: 'tebakbendera.json', reward: 5000, xp: 50, isImage: true },
    'tebakbendera2': { file: 'tebakbendera2.json', reward: 5000, xp: 50 },
    'tebakmakanan': { file: 'tebakmakanan.json', reward: 5000, xp: 50, isImage: true },
    'tebakprofesi': { file: 'tebakprofesi.json', reward: 5000, xp: 50 },
    'tebaknegara': { file: 'tebaknegara.json', reward: 5000, xp: 50 },
    'tebakjkt48': { file: 'tebakjkt48.json', reward: 7000, xp: 70, isImage: true },
    'tebakepep': { file: 'tebakepep.json', reward: 5000, xp: 50 },
    'tebakdrakor': { file: 'tebakdrakor.json', reward: 6000, xp: 60, isImage: true },
    'tebakfilm': { file: 'tebakfilm.json', reward: 5000, xp: 50 },
    'tebakkimia': { file: 'tebakkimia.json', reward: 8000, xp: 80 },
    'tebakkabupaten': { file: 'tebakkabupaten.json', reward: 6000, xp: 60, isImage: true },
    'siapakahaku': { file: 'siapakahaku.json', reward: 5000, xp: 50 },
    'susunkata': { file: 'susunkata.json', reward: 4000, xp: 40 },
    'asahotak': { file: 'asahotak.json', reward: 6000, xp: 60 },
    'tekateki': { file: 'tekateki.json', reward: 4000, xp: 40 },
    'caklontong': { file: 'caklontong.json', reward: 10000, xp: 100, hasDesk: true },
    'riddle': { file: 'riddle.json', reward: 7000, xp: 70 },
    'asmaulhusna': { file: 'asmaulhusna.json', reward: 5000, xp: 50, isQuiz: true }
};

module.exports = {
    name: 'tebak_games',
    command: Object.keys(GAMES_CONFIG),
    category: 'game',
    desc: 'Kumpulan game tebak-tebakan dari database lokal',
    async run(LilyBot, m, { command, prefix, isRegistered, replydaftar }) {
        if (!isRegistered) return replydaftar();

        const id = m.chat;
        const config = GAMES_CONFIG[command];
        
        // Cek jika game sedang berjalan
        if (LilyBot[command] && LilyBot[command][id]) {
            return m.reply(`Masih ada soal yang belum terjawab di chat ini! Ketik *nyerah* untuk menyerah.`);
        }

        try {
            // Load Data
            const filePath = path.join(DATA_PATH, config.file);
            if (!fs.existsSync(filePath)) return m.reply(`Maaf, database game ${command} tidak ditemukan.`);
            
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const item = data[Math.floor(Math.random() * data.length)];
            
            const timeout = 60000; // 60 detik
            const reward = config.reward;
            const xp = config.xp;

            let caption = `🎮 *GAME ${command.toUpperCase()}* 🎮\n\n`;
            if (config.isQuiz) {
                caption += `📝 *Soal:* Apa arti dari "${item.latin}" (${item.arabic})?\n\n`;
            } else {
                caption += `📝 *Soal:* ${item.soal || item.pertanyaan || 'Tebak gambar berikut!'}\n\n`;
            }
            caption += `⏳ *Waktu:* ${timeout / 1000} detik\n`;
            caption += `🎁 *Hadiah:* Rp ${reward.toLocaleString()} & ${xp} XP\n\n`;
            caption += `Balas pesan ini untuk menjawab!`;

            let msg;
            if (config.isImage && item.img) {
                msg = await LilyBot.sendMessage(m.chat, { image: { url: item.img }, caption }, { quoted: m });
            } else {
                msg = await LilyBot.sendMessage(m.chat, { text: caption }, { quoted: m });
            }

            // Simpan Sesi
            LilyBot[command] = LilyBot[command] ? LilyBot[command] : {};
            LilyBot[command][id] = [
                msg,
                item,
                setTimeout(() => {
                    if (LilyBot[command] && LilyBot[command][id]) {
                        LilyBot.sendMessage(m.chat, { text: `⌛ *Waktu Habis!*\nJawaban: *${item.jawaban}*${config.hasDesk ? `\n\n💡 *Penjelasan:* ${item.deskripsi}` : ''}` }, { quoted: msg });
                        delete LilyBot[command][id];
                    }
                }, timeout),
                reward,
                xp
            ];

        } catch (e) {
            console.error(e);
            m.reply(`Terjadi kesalahan saat memulai game.`);
        }
    }
};
