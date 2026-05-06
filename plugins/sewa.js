const {
    addSewaGroup,
    getSewaExpired,
    getSewaPosition,
    expiredCheck,
    checkSewaGroup
} = require('../lib/store');
const { isUrl } = require('../lib/myfunc');

// Helper: ms ke tanggal readable
function msToDate(ms) {
    if (isNaN(ms)) return '--';
    let d = Math.floor(ms / 86400000);
    let h = Math.floor(ms / 3600000) % 24;
    let mn = Math.floor(ms / 60000) % 60;
    return `${d}H ${h}J ${mn}M`;
}

module.exports = {
    name: 'sewa',
    command: ['addsewa', 'delsewa', 'delwa', 'listsewa', 'ceksewa', 'sewa', 'sewabot'],
    category: 'owner',
    desc: 'Manajemen sewa bot per grup',
    async run(LilyBot, m, { command, text, q, args, prefix, DinzTheCreator, isSewa, sewa, replyviex, reply, mess }) {

        switch (command) {
            case 'sewa':
            case 'sewabot': {
                // Info sewa untuk grup saat ini
                if (!m.isGroup) return replyviex(mess.only.group || 'Hanya bisa di grup!');
                if (!isSewa) return replyviex('Bot belum disewa di grup ini!\n\nHubungi owner untuk menyewa bot.');
                const info = sewa.find(s => s.id === m.chat);
                if (!info) return replyviex('Data sewa tidak ditemukan.');
                const expiry = info.expired === 'PERMANENT' ? 'PERMANENT' : msToDate(info.expired - Date.now());
                replyviex(`*STATUS SEWA BOT*\n\n✅ Bot aktif di grup ini\n⏰ Expire: ${expiry}`);
                break;
            }

            case 'addsewa': {
                if (!DinzTheCreator) return replyviex('Fitur ini hanya untuk Owner!');
                if (!text || text.split(' ').length < 2) {
                    return replyviex(`Cara: ${prefix}addsewa linkgc waktu\n\nContoh: ${prefix}addsewa https://chat.whatsapp.com/xxx 30d\n\nd=hari, h=jam, m=menit, y=tahun`);
                }
                const [link, waktu] = text.split(' ');
                if (!isUrl(link) || !link.includes('https://chat.whatsapp.com/')) {
                    return replyviex('Link grup WhatsApp tidak valid!');
                }
                try {
                    const groupId = link.split('https://chat.whatsapp.com/')[1];
                    const groupData = await LilyBot.groupAcceptInvite(groupId);
                    if (checkSewaGroup(groupData, sewa)) return replyviex('Bot sudah disewa di grup tersebut!');
                    addSewaGroup(groupData, waktu, sewa);
                    replyviex('✅ Berhasil menambahkan sewa grup!');
                } catch (e) {
                    console.error('[sewa:addsewa]', e);
                    replyviex('Gagal menambahkan sewa. Periksa link grup!');
                }
                break;
            }

            case 'delsewa':
            case 'delwa': {
                if (!DinzTheCreator) return replyviex('Fitur khusus owner!');
                if (!m.isGroup) return replyviex('Perintah ini hanya bisa di dalam grup yang menyewa bot!');
                if (!isSewa) return replyviex('Bot tidak disewa di grup ini!');
                const pos = getSewaPosition(m.chat, sewa);
                if (pos < 0) return replyviex('Data sewa tidak ditemukan!');
                sewa.splice(pos, 1);
                const fs = require('fs');
                fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2));
                reply('✅ Sukses menghapus sewa di grup ini');
                break;
            }

            case 'listsewa': {
                if (!DinzTheCreator) return replyviex('Fitur khusus owner!');
                let list = `*✨ LIST SEWA BOT ✨*\n\n*Total:* ${sewa.length}\n\n`;
                for (let x of sewa) {
                    let expiry = x.expired === 'PERMANENT' ? 'PERMANENT' : msToDate(x.expired - Date.now());
                    list += `*ID:* ${x.id}\n*Expire:* ${expiry}\n\n`;
                }
                LilyBot.sendMessage(m.chat, { text: list }, { quoted: m });
                break;
            }

            case 'ceksewa': {
                let list = `*CEK SEWA*\n\n*Total:* ${sewa.length}\n\n`;
                for (let x of sewa) {
                    let expiry = x.expired === 'PERMANENT' ? 'PERMANENT' : msToDate(x.expired - Date.now());
                    list += `*ID:* ${x.id}\n*Expire:* ${expiry}\n\n`;
                }
                LilyBot.sendMessage(m.chat, { text: list }, { quoted: m });
                break;
            }
        }
    }
};
