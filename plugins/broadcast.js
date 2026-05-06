module.exports = {
    name: 'broadcast',
    command: ['bctext', 'broadcasttext', 'broadcast', 'broadcastimage', 'bcimage', 'broadcastvideo', 'broadcastvid', 'bcvideo'],
    category: 'owner',
    desc: 'Broadcast pesan teks/gambar/video ke semua grup',
    async run(LilyBot, m, { command, q, text, mime, quoted, DinzTheCreator, participants, replyviex, mess, sleep }) {

        if (!DinzTheCreator) return replyviex(mess.only.owner);

        switch (command) {
            case 'bctext':
            case 'broadcasttext':
            case 'broadcast': {
                if (!q) return replyviex('Masukkan teks broadcast!');
                try {
                    const data = await LilyBot.groupFetchAllParticipating();
                    const groups = Object.entries(data).map(e => e[1]);
                    const chatIds = groups.map(v => v.id);
                    replyviex(`📢 Menyiarkan ke ${chatIds.length} grup...`);
                    for (let id of chatIds) {
                        try {
                            await LilyBot.sendMessage(id, {
                                text: `📣 *${global.ownername || 'Owner'}'s Siaran*\n\n${q}`
                            });
                            await sleep(1500);
                        } catch (e) { /* skip gagal */ }
                    }
                    replyviex(`✅ Berhasil broadcast ke ${chatIds.length} grup`);
                } catch (e) {
                    console.error('[broadcast:bctext]', e);
                    replyviex('Gagal broadcast: ' + e.message);
                }
                break;
            }

            case 'broadcastimage':
            case 'bcimage':
            case 'broadcastvideo':
            case 'broadcastvid':
            case 'bcvideo': {
                if (!quoted) return replyviex(`Reply gambar/video dengan caption ${prefix}${command}`);
                if (!/image|video/.test(mime)) return replyviex('Hanya bisa broadcast gambar atau video!');
                try {
                    const data = await LilyBot.groupFetchAllParticipating();
                    const groups = Object.entries(data).map(e => e[1]);
                    const chatIds = groups.map(v => v.id);
                    replyviex(`📢 Menyiarkan media ke ${chatIds.length} grup...`);
                    const media = await quoted.download();
                    const txt = `📣 *${global.ownername || 'Owner'}'s Siaran*\n\n${text || ''}`;
                    for (let id of chatIds) {
                        try {
                            if (/image/.test(mime)) {
                                await LilyBot.sendMessage(id, { image: media, caption: txt });
                            } else {
                                await LilyBot.sendMessage(id, { video: media, caption: txt });
                            }
                            await sleep(2000);
                        } catch (e) { /* skip gagal */ }
                    }
                    replyviex(`✅ Berhasil broadcast media ke ${chatIds.length} grup`);
                } catch (e) {
                    console.error('[broadcast:media]', e);
                    replyviex('Gagal broadcast media: ' + e.message);
                }
                break;
            }
        }
    }
};
