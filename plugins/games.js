const TicTacToe = require('../lib/tictactoe');

module.exports = {
    name: 'games',
    command: ['ttc', 'ttt', 'tictactoe', 'delttc', 'delttt', 'suitpvp', 'rps', 'rockpaperscissors', 'suit', 'nyerah', 'surrender'],
    category: 'game',
    desc: 'Fitur game interaktif (TicTacToe, Suit, Surrender)',
    async run(LilyBot, m, { command, text, prefix, isRegistered, replydaftar, replyviex, parseMention }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        LilyBot.game = LilyBot.game ? LilyBot.game : {};
        LilyBot.suit = LilyBot.suit ? LilyBot.suit : {};

        switch (command) {
            case 'ttc':
            case 'ttt':
            case 'tictactoe': {
                if (Object.values(LilyBot.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
                    return replyviex(`Kamu Masih Dalam Permainan\n> KETIK .delttc UNTUK KELUAR PERMAINAN`);
                }
                let room = Object.values(LilyBot.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));
                if (room) {
                    room.o = m.chat;
                    room.game.playerO = m.sender;
                    room.state = 'PLAYING';
                    let arr = room.game.render().map(v => {
                        return {
                            X: '❌',
                            O: '⭕',
                            1: '1️⃣',
                            2: '2️⃣',
                            3: '3️⃣',
                            4: '4️⃣',
                            5: '5️⃣',
                            6: '6️⃣',
                            7: '7️⃣',
                            8: '8️⃣',
                            9: '9️⃣'
                        }[v];
                    });
                    let str = `room ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nMenunggu @${room.game.currentTurn.split('@')[0]}\n\nKetik *surrender* untuk menyerah dan mengakui kekalahan`;
                    if (room.x !== room.o) {
                        await LilyBot.sendText(room.x, str, m, { mentions: parseMention(str) });
                    }
                    await LilyBot.sendText(room.o, str, m, { mentions: parseMention(str) });
                } else {
                    room = {
                        id: 'tictactoe-' + (+new Date()),
                        x: m.chat,
                        o: '',
                        game: new TicTacToe(m.sender, 'o'),
                        state: 'WAITING'
                    };
                    if (text) room.name = text;
                    replyviex("Tag pasangan ttc\n> Contoh: .ttc @dinz" + (text ? `\n\n𝗧𝗘𝗞𝗦 𝗗𝗜 𝗔𝗧𝗔𝗦 𝗔𝗕𝗔𝗜𝗞𝗔𝗡 𝗦𝗔𝗝𝗔\n YANG DITAG WAJIB KETIK *${prefix}${command}* UNTUK BERMAIN` : ""));
                    LilyBot.game[room.id] = room;
                }
                break;
            }

            case 'delttc':
            case 'delttt': {
                try {
                    if (LilyBot.game) {
                        delete LilyBot.game;
                        LilyBot.sendText(m.chat, `Successfully deleted TicTacToe session`, m);
                    } else {
                        replyviex(`Session TicTacToe🎮 does not exist`);
                    }
                } catch (e) {
                    replyviex("damaged");
                }
                break;
            }

            case 'suitpvp':
            case 'rps':
            case 'rockpaperscissors':
            case 'suit': {
                let poin = 10;
                let poin_lose = 10;
                let timeout = 60000;
                if (Object.values(LilyBot.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) {
                    return replyviex(`Complete your previous game`);
                }
                if (m.mentionedJid[0] === m.sender) {
                    return replyviex(`Can't play with myself !`);
                }
                if (!m.mentionedJid[0]) {
                    return replyviex(`_Who do you want to challenge?_\nTag the person..\n\nContoh : .suit @user`);
                }
                if (Object.values(LilyBot.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) {
                    return replyviex(`Orang yang Anda tantang sedang bermain sesuai dengan orang lain :(`);
                }
                let id = 'suit_' + (new Date() * 1);
                let caption = `_*SUIT PvP*_\n\n@${m.sender.split('@')[0]} *Challenged* @${m.mentionedJid[0].split('@')[0]} *to play suit*\n\n*Hi* @${m.mentionedJid[0].split('@')[0]} *Silahkan ketik accept untuk menerima atau ketik reject untuk menolak*`;
                LilyBot.suit[id] = {
                    chat: await LilyBot.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
                    id: id,
                    p: m.sender,
                    p2: m.mentionedJid[0],
                    status: 'wait',
                    waktu: setTimeout(() => {
                        if (LilyBot.suit[id]) {
                            LilyBot.sendText(m.chat, `_𝙒𝘼𝙆𝙏𝙐 𝙎𝙐𝙄𝙏 𝙃𝘼𝘽𝙄𝙎_`, m);
                        }
                        delete LilyBot.suit[id];
                    }, timeout),
                    poin,
                    poin_lose,
                    timeout
                };
                break;
            }

            case 'nyerah':
            case 'surrender': {
                const id = m.chat;
                const games = [
                    'tebaklagu', 'family100', 'tebakgambar', 'tebakkata', 'kuismath',
                    'tebakkalimat', 'tebaklirik', 'tebaktebakan', 'tebakbendera',
                    'tebaksiapakahaku', 'tebaksusunkata', 'tebaktekateki', 'suit', 'game'
                ];

                let found = false;
                for (let gameName of games) {
                    if (LilyBot[gameName] && LilyBot[gameName][id]) {
                        if (gameName === 'game') { // TicTacToe special handle
                            const room = LilyBot.game[id];
                            if (room) {
                                delete LilyBot.game[id];
                                found = true;
                            }
                        } else {
                            if (LilyBot[gameName][id][3]) clearTimeout(LilyBot[gameName][id][3]); // Clear timeout if exists
                            delete LilyBot[gameName][id];
                            found = true;
                        }
                    }
                }

                if (found) {
                    return m.reply(`🏳️ Kamu telah menyerah dari permainan ini. Sesi game di chat ini telah dihentikan.`);
                } else {
                    return m.reply(`🧐 Tidak ada permainan aktif yang sedang berlangsung di chat ini.`);
                }
            }
        }
    }
}
