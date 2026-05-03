const TicTacToe = require('../lib/tictactoe');

module.exports = {
    name: 'games',
    command: ['ttc', 'ttt', 'tictactoe', 'delttc', 'delttt', 'suitpvp', 'rps', 'rockpaperscissors', 'suit'],
    category: 'game',
    desc: 'Fitur game interaktif (TicTacToe, Suit)',
    async run(DinzBotz, m, { command, text, prefix, isRegistered, replydaftar, replyviex, parseMention }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        DinzBotz.game = DinzBotz.game ? DinzBotz.game : {};
        DinzBotz.suit = DinzBotz.suit ? DinzBotz.suit : {};

        switch (command) {
            case 'ttc':
            case 'ttt':
            case 'tictactoe': {
                if (Object.values(DinzBotz.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
                    return replyviex(`Kamu Masih Dalam Permainan\n> KETIK .delttc UNTUK KELUAR PERMAINAN`);
                }
                let room = Object.values(DinzBotz.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));
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
                        await DinzBotz.sendText(room.x, str, m, { mentions: parseMention(str) });
                    }
                    await DinzBotz.sendText(room.o, str, m, { mentions: parseMention(str) });
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
                    DinzBotz.game[room.id] = room;
                }
                break;
            }

            case 'delttc':
            case 'delttt': {
                try {
                    if (DinzBotz.game) {
                        delete DinzBotz.game;
                        DinzBotz.sendText(m.chat, `Successfully deleted TicTacToe session`, m);
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
                if (Object.values(DinzBotz.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) {
                    return replyviex(`Complete your previous game`);
                }
                if (m.mentionedJid[0] === m.sender) {
                    return replyviex(`Can't play with myself !`);
                }
                if (!m.mentionedJid[0]) {
                    return replyviex(`_Who do you want to challenge?_\nTag the person..\n\nContoh : .suit @user`);
                }
                if (Object.values(DinzBotz.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) {
                    return replyviex(`Orang yang Anda tantang sedang bermain sesuai dengan orang lain :(`);
                }
                let id = 'suit_' + (new Date() * 1);
                let caption = `_*SUIT PvP*_\n\n@${m.sender.split('@')[0]} *Challenged* @${m.mentionedJid[0].split('@')[0]} *to play suit*\n\n*Hi* @${m.mentionedJid[0].split('@')[0]} *Silahkan ketik accept untuk menerima atau ketik reject untuk menolak*`;
                DinzBotz.suit[id] = {
                    chat: await DinzBotz.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
                    id: id,
                    p: m.sender,
                    p2: m.mentionedJid[0],
                    status: 'wait',
                    waktu: setTimeout(() => {
                        if (DinzBotz.suit[id]) {
                            DinzBotz.sendText(m.chat, `_𝙒𝘼𝙆𝙏𝙐 𝙎𝙐𝙄𝙏 𝙃𝘼𝘽𝙄𝙎_`, m);
                        }
                        delete DinzBotz.suit[id];
                    }, timeout),
                    poin,
                    poin_lose,
                    timeout
                };
                break;
            }
        }
    }
}
