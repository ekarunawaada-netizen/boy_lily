require("./settings");
const { WA_DEFAULT_EPHEMERAL } = require('lily-baileys').default

global.startupTime = global.startupTime || Date.now();

// ── Rate-limit protection ──────────────────────────────────────────────────
const SEND_DELAY_MS    = 3500;   // jeda antar pesan (ms)
const META_CACHE_TTL   = 5 * 60 * 1000; // cache metadata 5 menit
const MAX_RETRY        = 2;      // max retry saat rate-overlimit

const metaCache = new Map();     // { groupId → { data, expiry } }
let   msgQueue  = [];            // antrian pesan
let   isProcessing = false;      // flag sedang proses queue

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getGroupMeta(Zion, id) {
    const cached = metaCache.get(id);
    if (cached && Date.now() < cached.expiry) return cached.data;

    const data = await Zion.groupMetadata(id);
    metaCache.set(id, { data, expiry: Date.now() + META_CACHE_TTL });
    return data;
}

async function processQueue() {
    if (isProcessing) return;
    isProcessing = true;

    while (msgQueue.length > 0) {
        const task = msgQueue.shift();
        let attempt = 0;

        while (attempt <= MAX_RETRY) {
            try {
                await task();
                break;
            } catch (err) {
                if (err.message === 'rate-overlimit' && attempt < MAX_RETRY) {
                    const wait = (attempt + 1) * 5000; // backoff: 5s, 10s
                    console.log(`⚠️ rate-overlimit, retry ke-${attempt + 1} setelah ${wait / 1000}s...`);
                    await sleep(wait);
                    attempt++;
                } else {
                    console.error('❌ Gagal kirim pesan grup:', err.message);
                    break;
                }
            }
        }

        await sleep(SEND_DELAY_MS);
    }

    isProcessing = false;
}

function enqueue(fn) {
    msgQueue.push(fn);
    processQueue();
}

// ─────────────────────────────────────────────────────────────────────────────

async function GroupParticipants(Zion, { id, participants, action, author }) {
    // Abaikan event saat startup (30 detik pertama) untuk menghindari spam
    if (Date.now() - global.startupTime < 30000) return;

    let subject;
    try {
        const gcdata = await getGroupMeta(Zion, id);
        subject = gcdata.subject;
    } catch (err) {
        console.error('Error fetching group metadata in GroupParticipants:', err.message);
        return;
    }

    for (const jid of participants) {
        const check = author && author !== jid && author.length > 1;
        const tag   = check ? [author, jid] : [jid];

        switch (action) {
            case 'add':
                enqueue(() =>
                    Zion.sendMessage(
                        id,
                        {
                            image: { url: setwel },
                            caption: `Hai @${jid.split('@')[0]} 👋\n\nSelamat datang di *${subject}*!\nJangan lupa baca deskripsi grup dan tetap patuhi aturan. 😊✨`,
                            contextInfo: { mentionedJid: [jid] }
                        },
                        { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                    )
                );
                break;

            case 'remove':
                enqueue(() =>
                    Zion.sendMessage(
                        id,
                        {
                            image: { url: setwel },
                            caption: `Selamat tinggal @${jid.split('@')[0]} 👋\nSemoga sukses di luar sana! 🚀`,
                            contextInfo: { mentionedJid: [jid] }
                        },
                        { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                    )
                );
                break;

            case 'promote':
                if (author) {
                    enqueue(() =>
                        Zion.sendMessage(
                            id,
                            {
                                text: `🎉 *@${author.split('@')[0]} telah menjadikan @${jid.split('@')[0]} sebagai admin grup ini!* 👑`,
                                contextInfo: { mentionedJid: [...tag] }
                            },
                            { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                        )
                    );
                }
                break;

            case 'demote':
                if (author) {
                    enqueue(() =>
                        Zion.sendMessage(
                            id,
                            {
                                text: `😔 *@${author.split('@')[0]} telah menghapus @${jid.split('@')[0]} dari jabatan admin grup ini.* 🚫`,
                                contextInfo: { mentionedJid: [...tag] }
                            },
                            { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                        )
                    );
                }
                break;

            default:
                console.log(`⚠️ Aksi tidak dikenal: ${action} untuk ${jid} di grup ${subject}`);
        }
    }
}

module.exports = GroupParticipants;