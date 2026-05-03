const fs = require('fs');

// In-memory vote storage (reset on restart, persistent version butuh DB)
const votes = {};

module.exports = {
    name: 'utility',
    command: [
        'vote', 'upvote', 'downvote', 'checkvote', 'deletevote', 'delvote',
        'tourl', 'tourl2',
        'rvo', 'readviewonce', 'toonce', 'toviewonce',
        'ss', 'ssweb', 'screenshot',
        'join',
        'react',
        'fliptext', 'styletext',
        'listpc', 'listgc',
        'totalfitur', 'runtime',
        'quoted', 'q',
        'myip'
    ],
    category: 'utility',
    desc: 'Fitur utilitas umum bot',
    async run(DinzBotz, m, { command, q, text, args, prefix, from,
        DinzTheCreator, isOwner, isRegistered, isAdmins, isBotAdmins,
        quoted, mime, mess, replyviex, reply, fetchJson, getBuffer,
        totalfitur, runtime }) {

        switch (command) {

            // === VOTE SYSTEM ===
            case 'vote':
            case 'poll': {
                if (!m.isGroup) return reply(mess.only.group || 'Hanya di grup!');
                if (!text) return replyviex(`Cara: ${prefix}vote pertanyaan|pilihan1|pilihan2\nContoh: ${prefix}vote Makan apa?|Nasi|Mie`);
                const parts = text.split('|');
                if (parts.length < 3) return replyviex('Minimal 2 pilihan!\nFormat: pertanyaan|pilihan1|pilihan2');
                const [question, ...options] = parts;
                const voteKey = `${m.chat}_${Date.now()}`;
                votes[voteKey] = { question, options, votes: options.map(() => []), creator: m.sender, chat: m.chat };
                let teks = `📊 *VOTE / POLL*\n\n❓ ${question}\n\n`;
                options.forEach((opt, i) => { teks += `${i + 1}. ${opt}\n`; });
                teks += `\nID Vote: \`${voteKey}\``;
                await DinzBotz.sendMessage(m.chat, { text: teks }, { quoted: m });
                break;
            }
            case 'upvote': {
                if (!q) return replyviex(`Cara: ${prefix}upvote voteID nomorPilihan`);
                const [vid, num] = q.split(' ');
                if (!votes[vid]) return replyviex('Vote tidak ditemukan!');
                const idx = parseInt(num) - 1;
                if (isNaN(idx) || idx < 0 || idx >= votes[vid].options.length) return replyviex('Nomor pilihan tidak valid!');
                if (!votes[vid].votes[idx].includes(m.sender)) votes[vid].votes[idx].push(m.sender);
                replyviex(`✅ Vote berhasil untuk: ${votes[vid].options[idx]}`);
                break;
            }
            case 'checkvote': {
                if (!q) return replyviex(`Cara: ${prefix}checkvote voteID`);
                const v = votes[q];
                if (!v) return replyviex('Vote tidak ditemukan!');
                let teks = `📊 *HASIL VOTE*\n\n❓ ${v.question}\n\n`;
                v.options.forEach((opt, i) => { teks += `${i + 1}. ${opt}: ${v.votes[i].length} vote\n`; });
                replyviex(teks);
                break;
            }
            case 'deletevote':
            case 'delvote': {
                if (!q) return replyviex(`Cara: ${prefix}delvote voteID`);
                if (!votes[q]) return replyviex('Vote tidak ditemukan!');
                if (votes[q].creator !== m.sender && !DinzTheCreator) return replyviex('Hanya pembuat vote yang bisa menghapus!');
                delete votes[q];
                replyviex('✅ Vote berhasil dihapus');
                break;
            }

            // === TO URL ===
            case 'tourl':
            case 'tourl2': {
                if (!quoted) return replyviex(`Reply media (gambar/video/audio) dengan caption ${prefix}${command}`);
                try {
                    const { UploadFileUgu } = require('../lib/uploader');
                    replyviex(mess.wait || 'Mengupload...');
                    const buff = await quoted.download();
                    const upload = await UploadFileUgu(buff);
                    replyviex(`✅ *Upload Berhasil!*\n\n🔗 URL: ${upload.url}`);
                } catch (e) {
                    console.error('[utility:tourl]', e);
                    replyviex('Gagal upload media: ' + e.message);
                }
                break;
            }

            // === READ VIEW ONCE ===
            case 'rvo':
            case 'readviewonce':
            case 'toonce':
            case 'toviewonce': {
                if (!quoted) return replyviex(`Reply pesan viewonce dengan caption ${prefix}${command}`);
                try {
                    const { downloadContentFromMessage } = require('lily-baileys');
                    const type = m.quoted?.mtype?.replace('Message', '') || 'image';
                    const stream = await downloadContentFromMessage(m.quoted[m.quoted.mtype], type);
                    let buff = Buffer.from([]);
                    for await (const chunk of stream) buff = Buffer.concat([buff, chunk]);
                    if (/image/.test(mime)) {
                        await DinzBotz.sendMessage(m.chat, { image: buff, caption: '🔓 View Once dibuka!' }, { quoted: m });
                    } else if (/video/.test(mime)) {
                        await DinzBotz.sendMessage(m.chat, { video: buff, caption: '🔓 View Once dibuka!' }, { quoted: m });
                    } else if (/audio/.test(mime)) {
                        await DinzBotz.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mp4' }, { quoted: m });
                    }
                } catch (e) {
                    console.error('[utility:rvo]', e);
                    replyviex('Gagal buka view once: ' + e.message);
                }
                break;
            }

            // === SCREENSHOT ===
            case 'ss':
            case 'ssweb':
            case 'screenshot': {
                if (!q) return replyviex(`Masukkan URL!\nContoh: ${prefix}${command} https://google.com`);
                const url = q.startsWith('http') ? q : 'https://' + q;
                try {
                    const ssUrl = `https://api.siputzx.my.id/api/screenshot?url=${encodeURIComponent(url)}`;
                    replyviex(mess.wait || 'Mengambil screenshot...');
                    await DinzBotz.sendMessage(m.chat, {
                        image: { url: ssUrl },
                        caption: `📸 Screenshot dari: ${url}`
                    }, { quoted: m });
                } catch (e) {
                    replyviex('Gagal screenshot: ' + e.message);
                }
                break;
            }

            // === JOIN GROUP ===
            case 'join': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                if (!q) return replyviex(`Cara: ${prefix}join https://chat.whatsapp.com/xxx`);
                const link = q.split('https://chat.whatsapp.com/')[1];
                if (!link) return replyviex('Link grup tidak valid!');
                try {
                    await DinzBotz.groupAcceptInvite(link);
                    replyviex('✅ Berhasil join grup!');
                } catch (e) {
                    replyviex('Gagal join grup: ' + e.message);
                }
                break;
            }

            // === REACT ===
            case 'react': {
                if (!m.quoted) return replyviex(`Reply pesan dengan caption ${prefix}react [emoji]`);
                const emoji = q || '❤️';
                await DinzBotz.sendMessage(m.chat, {
                    react: { text: emoji, key: m.quoted.key }
                });
                break;
            }

            // === FLIP TEXT ===
            case 'fliptext': {
                if (!q) return replyviex(`Masukkan teks!\nContoh: ${prefix}fliptext hello`);
                const flipped = q.split('').map(c => {
                    const map = {'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z'};
                    return map[c.toLowerCase()] || c;
                }).reverse().join('');
                replyviex(`🔄 *Flip Text*\n\nOriginal: ${q}\nFlipped: ${flipped}`);
                break;
            }

            // === LIST PC / GC ===
            case 'listpc': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                try {
                    const chats = await DinzBotz.chats?.all?.() || [];
                    const pcs = chats.filter(c => !c.id.endsWith('@g.us'));
                    replyviex(`*📱 Daftar Private Chat*\n\nTotal: ${pcs.length}\n\n${pcs.slice(0,20).map((c,i) => `${i+1}. ${c.id}`).join('\n')}`);
                } catch { replyviex('Gagal mengambil list PC'); }
                break;
            }
            case 'listgc': {
                if (!DinzTheCreator) return replyviex(mess.only.owner);
                try {
                    const data = await DinzBotz.groupFetchAllParticipating();
                    const groups = Object.values(data);
                    replyviex(`*👥 Daftar Group Chat*\n\nTotal: ${groups.length}\n\n${groups.slice(0,20).map((g,i) => `${i+1}. ${g.subject}`).join('\n')}`);
                } catch { replyviex('Gagal mengambil list GC'); }
                break;
            }

            // === TOTAL FITUR ===
            case 'totalfitur': {
                const total = typeof totalfitur === 'function' ? totalfitur() : '?';
                replyviex(`📊 *Total Fitur Bot*\n\n✅ *${total}* Fitur Tersedia`);
                break;
            }

            // === RUNTIME ===
            case 'runtime': {
                const uptime = process.uptime();
                const h = Math.floor(uptime / 3600);
                const mn = Math.floor((uptime % 3600) / 60);
                const s = Math.floor(uptime % 60);
                replyviex(`⏱️ *Bot Runtime*\n\n${h} jam, ${mn} menit, ${s} detik`);
                break;
            }

            // === QUOTED ===
            case 'quoted':
            case 'q': {
                if (!m.quoted) return replyviex('Reply ke pesan yang ingin dilihat info-nya!');
                replyviex(JSON.stringify(m.quoted, null, 2).substring(0, 3000));
                break;
            }

            // === MY IP ===
            case 'myip': {
                try {
                    const res = await fetchJson('https://api.ipify.org?format=json');
                    replyviex(`🌐 *IP Bot*\n\n${res.ip}`);
                } catch { replyviex('Gagal mengambil IP'); }
                break;
            }
        }
    }
};
