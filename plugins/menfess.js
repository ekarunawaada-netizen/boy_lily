module.exports = {
    name: 'menfess',
    command: ['confess', 'confes', 'menfes', 'menfess', 'balasmenfess', 'tolakmenfess', 'stopmenfess'],
    category: 'fun',
    desc: 'Fitur mengirim pesan rahasia (Menfess)',
    async run(DinzBotz, m, { command, text, prefix, pushname, isRegistered, replydaftar, replyviex, getBuffer }) {
        if (!isRegistered) {
            return replydaftar("👋 Halo kak, anda belum bisa mengakses bot nih daftar dulu ya.\n\n╭──「 `CARA DAFTAR` 」─✦\n│⦿ 〔 Cara : .daftar nama.umur\n│⦿ 〔 Contoh : .daftar Lily.20\n│⦿ 〔 Botname : LilyMD✨\n╰───────────────────✦\n\nDENGAN DAFTAR KAMU BISA AKSES BOT SEPUASNYA\n\n💂‍♀: Kenapa harus daftar sih?\n🍁: Agar bot mengenal siapa anda\n💂‍♀: Ribet banget harus daftar segala\n🍁: Jika tidak daftar, Anda tidak bisa menggunakan fitur bot");
        }

        DinzBotz.menfes = DinzBotz.menfes ?? {};

        switch (command) {
            case 'confess':
            case 'confes':
            case 'menfes':
            case 'menfess': {
                const session = Object.values(DinzBotz.menfes).find(v => v.state === 'CHATTING' && [v.a, v.b].includes(m.sender));
                if (session) {
                    const target = session.a === m.sender ? session.b : session.a;
                    await DinzBotz.sendMessage(target, {
                        text: `📩 Pesan baru dari @${m.sender.split('@')[0]}:\n\n${m.text}`,
                        mentions: [m.sender]
                    });
                    replyviex("Pesan diteruskan.");
                    return;
                }
                const roof = Object.values(DinzBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
                if (roof) {
                    return replyviex("Kamu masih berada dalam sesi menfess");
                }
                if (m.isGroup) {
                    return replyviex("Fitur hanya tersedia di private chat!");
                }
                if (!text) {
                    return replyviex(`Kirim perintah ${prefix + command} nama|nomor|pesan\n\nContoh:\n${prefix + command} ${pushname}|628xxx|Menfess nih`);
                }
                if (!text.includes("|")) {
                    return replyviex("Format salah! Gunakan format: nama|nomor|pesan");
                }
                let [namaNya, nomorNya, pesanNya] = text.split("|");
                nomorNya = nomorNya.replace(/^0/, "62");
                if (isNaN(nomorNya)) {
                    return replyviex("Nomor tidak valid! Pastikan hanya menggunakan angka.");
                }
                const yoi = `Hi ada menfess nih buat kamu\n\nDari: ${namaNya}\nPesan: ${pesanNya}\n\nKetik:\n${prefix}balasmenfess -- Untuk menerima menfess\n${prefix}tolakmenfess -- Untuk menolak menfess\n\n_Pesan ini dikirim oleh bot._`;
                const tod = await getBuffer("https://telegra.ph/file/c8fdfc8426f5f60b48cca.jpg");
                const id = m.sender;
                DinzBotz.menfes[id] = {
                    id,
                    a: m.sender,
                    b: `${nomorNya}@s.whatsapp.net`,
                    state: "WAITING"
                };
                await DinzBotz.sendMessage(`${nomorNya}@s.whatsapp.net`, {
                    image: tod,
                    caption: yoi
                });
                replyviex("Pesan berhasil dikirim ke nomor tujuan. Semoga dibalas ya!");
                break;
            }

            case 'balasmenfess': {
                const room = Object.values(DinzBotz.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING');
                if (!room) {
                    return replyviex("Belum ada sesi menfess atau tidak ada yang menunggu");
                }
                const other = [room.a, room.b].find(user => user !== m.sender);
                room.b = m.sender;
                room.state = 'CHATTING';
                await DinzBotz.sendMessage(other, {
                    text: `_@${m.sender.split('@')[0]} telah menerima menfess kamu, sekarang kamu bisa chat lewat bot ini._\n\n*NOTE:* Ketik .stopmenfess untuk berhenti.`,
                    mentions: [m.sender]
                });
                replyviex("Menfess diterima, sekarang kamu bisa chat!\nSilakan balas pesan langsung di chat ini. Semua pesan akan diteruskan.");
                break;
            }

            case 'tolakmenfess': {
                const roof = Object.values(DinzBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
                if (!roof) return replyviex("Belum ada sesi menfess");
                const other = [roof.a, roof.b].find(user => user !== m.sender);
                await DinzBotz.sendMessage(other, {
                    text: `_Maaf, @${m.sender.split('@')[0]} menolak menfess kamu._`,
                    mentions: [m.sender]
                });
                replyviex("Menfess berhasil ditolak.");
                delete DinzBotz.menfes[roof.id];
                break;
            }

            case 'stopmenfess': {
                const find = Object.values(DinzBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
                if (!find) return replyviex("Belum ada sesi menfess");
                const to = find.a === m.sender ? find.b : find.a;
                await DinzBotz.sendMessage(to, {
                    text: "_Sesi menfess ini telah dihentikan._",
                    mentions: [m.sender]
                });
                replyviex("Sesi menfess dihentikan.");
                delete DinzBotz.menfes[find.id];
                break;
            }
        }
    }
}
