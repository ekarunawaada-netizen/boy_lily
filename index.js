
require('./settings')
const { cleanTempFiles } = require('./lib/sessionManager')
const { modul } = require('./module');
const moment = require('moment-timezone');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber, axios, yargs, _ } = modul;
const { Boom } = boom
const {
    default: XeonBotIncConnect,
    BufferJSON,
    PHONENUMBER_MCC,
    initInMemoryKeyStore,
    DisconnectReason,
    AnyMessageContent,
    makeInMemoryStore,
    useMultiFileAuthState,
    delay,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    proto
} = require("lily-baileys")
const cfonts = require('cfonts');
const { color } = require('./lib/color')
const { TelegraPh } = require('./lib/uploader')
const NodeCache = require("node-cache")
const canvafy = require("canvafy")
const { parsePhoneNumber } = require("libphonenumber-js")
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
const makeWASocket = require("lily-baileys").default
const Pino = require("pino")
const readline = require("readline")
const colors = require('colors')
const { start } = require('./lib/spinner')
const { uncache, nocache } = require('./lib/loader')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

const prefix = ''
let phoneNumber = "628813788606"
global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
    sticker: {},
    database: {},
    groups: {},
    game: {},
    others: {},
    users: {},
    chats: {},
    settings: {},
    ...(global.db || {})
}
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

require('./Lily.js')
nocache('../Lily.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

// ── Reconnect state ──────────────────────────────────────────────────
let reconnectAttempts = 0;

async function theFontaine() {
    const { saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
    const msgRetryCounterCache = new NodeCache()
    const Lily = XeonBotIncConnect({
        version: [2, 3000, 1031850069],
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode,
        mobile: useMobile,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        browser: ['Ubuntu', 'Firefox', '24.04'],
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: undefined,
        keepAliveIntervalMs: 10000,
        retryRequestDelayMs: 2000,
        maxMsgRetryCount: 5,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: false,
        syncFullHistory: false,
        markOnlineOnConnect: true,
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg?.message || undefined
            }
            return { conversation: "Lily Bot Here!" }
        },
        msgRetryCounterCache,
    })

    if (!Lily.authState.creds.registered) {
        const phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62 Recode :\n');
        let code = await Lily.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(`𝙽𝙸 𝙺𝙾𝙳𝙴 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙻𝚄 :`, code);
    }

    store.bind(Lily.ev)

    // Bersihkan file temp setiap 30 menit (hemat disk Pterodactyl)
    setInterval(() => { cleanTempFiles(); }, 30 * 60 * 1000);

    Lily.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'connecting') {
            console.log('🟡 Connecting to WhatsApp...')
        }

        if (connection === 'open') {
            reconnectAttempts = 0;
            await delay(2000)
            cfonts.say('Lily', {
                font: 'block',
                align: 'left',
                colors: ['blue', 'blueBright'],
                background: 'transparent',
                maxLength: 20,
                rawMode: false,
            })
            console.log('🟢 Bot connected dan running 24/7 di Pterodactyl.')
        }

        if (connection === 'close') {
            const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode || 0
            console.log(`🔴 Disconnect. Code: ${statusCode}`)

            // loggedOut / banned → jangan reconnect, biar Pterodactyl restart bersih
            if (statusCode === DisconnectReason.loggedOut) {
                console.log('🚫 Logout. Pterodactyl akan restart bot.')
                process.exit(0)
                return
            }

            // connectionReplaced → ada 2 instance jalan, stop yang ini
            if (statusCode === DisconnectReason.connectionReplaced) {
                console.log('⚠️ Sesi digantikan. Pastikan hanya 1 bot berjalan!')
                process.exit(0)
                return
            }

            // Semua kasus lain: reconnect dengan backoff
            reconnectAttempts++
            const backoffMs = Math.min(5000 * reconnectAttempts, 60000)
            console.log(`🔁 Reconnect ke-${reconnectAttempts} dalam ${backoffMs / 1000}s...`)
            setTimeout(() => theFontaine(), backoffMs)
        }
    })

    await delay(0)
    start('2', colors.bold.white('\n\nMenunggu Pesan Baru..'))
    Lily.ev.on('creds.update', await saveCreds)

    // Anti Call
    Lily.ev.on('call', async (XeonPapa) => {
        let botNumber = await Lily.decodeJid(Lily.user.id)
        let XeonBotNum = db.settings[botNumber]?.anticall
        if (!XeonBotNum) return
        for (let XeonFucks of XeonPapa) {
            if (XeonFucks.isGroup == false) {
                if (XeonFucks.status == "offer") {
                    let XeonBlokMsg = await Lily.sendTextWithMentions(XeonFucks.from, `*${Lily.user.name}* can't receive ${XeonFucks.isVideo ? `video` : `voice`} call. Sorry @${XeonFucks.from.split('@')[0]} you will be blocked.`)
                    Lily.sendContact(XeonFucks.from, global.owner, XeonBlokMsg)
                    await sleep(5000)
                    await Lily.updateBlockStatus(XeonFucks.from, "block")
                }
            }
        }
    })

    Lily.ev.on('messages.upsert', async chatUpdate => {
        try {
            if (chatUpdate.type !== 'notify') return
            const kay = chatUpdate.messages[0]
            if (!kay.message) return
            kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
            if (kay.key && kay.key.remoteJid === 'status@broadcast') {
                await Lily.readMessages([kay.key])
            }
            if (!Lily.public && !kay.key.fromMe) return
            if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
            const m = smsg(Lily, kay, store)
            require('./Lily')(Lily, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

    async function getMessage(key) {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return { conversation: "Lily Bot Ada Di Sini" }
    }

    Lily.ev.on('messages.update', async chatUpdate => {
        for (const { key, update } of chatUpdate) {
            if (update.pollUpdates && !key.fromMe) {
                const pollCreation = await getMessage(key)
                if (pollCreation) {
                    const pollUpdate = await getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                    var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
                    if (toCmd == undefined) return
                    var prefCmd = prefix + toCmd
                    Lily.appenTextMessage(prefCmd, chatUpdate)
                }
            }
        }
    })

    Lily.ev.on('messages.upsert', async (update) => {
        const msg = update.messages[0]
        const maxTime = 5 * 60 * 1000
        Lily.decodeJid = (jid) => {
            if (!jid) return jid
            if (/:\d+@/gi.test(jid)) {
                const decode = jidDecode(jid) || {}
                return (decode.user && decode.server && decode.user + "@" + decode.server) || jid
            } else return jid
        }
        if (global.settings.autoreact && msg.key.remoteJid === 'status@broadcast') {
            if (msg.key.fromMe) return
            const currentTime = Date.now()
            const messageTime = msg.messageTimestamp * 1000
            const timeDiff = currentTime - messageTime
            if (timeDiff <= maxTime) {
                if (msg.pushName && msg.pushName.trim() !== "") {
                    await Lily.readMessages([msg.key])
                    const key = msg.key
                    const status = msg.key.remoteJid
                    const me = await Lily.decodeJid(Lily.user.id)
                    const emoji = global.emoji[Math.floor(Math.random() * global.emoji.length)]
                    await Lily.sendMessage(status, { react: { key: key, text: emoji } }, { statusJidList: [key.participant, me] })
                    console.log("React WhatsApp Story - " + msg.pushName)
                }
            }
        }
    })

    Lily.sendTextWithMentions = async (jid, text, quoted, options = {}) => Lily.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    Lily.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    Lily.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = Lily.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    Lily.getName = (jid, withoutContact = false) => {
        id = Lily.decodeJid(jid)
        withoutContact = Lily.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = Lily.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' } : id === Lily.decodeJid(Lily.user.id) ?
            Lily.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    Lily.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }

    Lily.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                displayName: await Lily.getName(i),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Lily.getName(i)}\nFN:${await Lily.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nEND:VCARD`
            })
        }
        Lily.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

    Lily.setStatus = (status) => {
        Lily.query({
            tag: 'iq',
            attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status' },
            content: [{ tag: 'status', attrs: {}, content: Buffer.from(status, 'utf-8') }]
        })
        return status
    }

    Lily.public = true

    Lily.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await Lily.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    Lily.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await Lily.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
            .then(response => { fs.unlinkSync(buffer); return response })
    }

    Lily.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await Lily.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    Lily.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = { ...message.message.viewOnceMessage.message }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = { ...context, ...content[ctype].contextInfo }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype], ...options,
            ...(options.contextInfo ? { contextInfo: { ...content[ctype].contextInfo, ...options.contextInfo } } : {})
        } : {})
        await Lily.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
        return waMessage
    }

    Lily.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) { buffer = Buffer.concat([buffer, chunk]) }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    Lily.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) { buffer = Buffer.concat([buffer, chunk]) }
        return buffer
    }

    Lily.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' }
        filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return { res, filename, size: await getSizeMedia(data), ...type, data }
    }

    Lily.sendText = (jid, text, quoted = '', options) => Lily.sendMessage(jid, { text: text, ...options }, { quoted })
    Lily.serializeM = (m) => smsg(Lily, m, store)

    Lily.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = { text, footer, buttons, headerType: 2, ...options }
        Lily.sendMessage(jid, buttonMessage, { quoted, ...options })
    }

    Lily.sendKatalog = async (jid, title = '', desc = '', gam, options = {}) => {
        let message = await prepareWAMessageMedia({ image: gam }, { upload: Lily.waUploadToServer })
        const tod = generateWAMessageFromContent(jid, {
            "productMessage": {
                "product": {
                    "productImage": message.imageMessage,
                    "productId": "9999",
                    "title": title,
                    "description": desc,
                    "currencyCode": "INR",
                    "priceAmount1000": "100000",
                    "url": `${websitex}`,
                    "productImageCount": 1,
                    "salePriceAmount1000": "0"
                },
                "businessOwnerJid": `${ownernumber}@s.whatsapp.net`
            }
        }, options)
        return Lily.relayMessage(jid, tod.message, { messageId: tod.key.id })
    }

    Lily.send5ButLoc = async (jid, text = '', footer = '', img, but = [], options = {}) => {
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    "hydratedContentText": text,
                    "locationMessage": { "jpegThumbnail": img },
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)
        Lily.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
        ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {})
    })) : '')

    Lily.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await Lily.getFile(path, true);
        let { res, data: file, filename: pathFile } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) } } catch (e) { if (e.json) throw e.json; }
        }
        let opt = { filename };
        if (quoted) opt.quoted = quoted;
        if (!type) options.asDocument = true;
        let mtype = '', mimetype = type.mime, convert;
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) {
            convert = await (ptt ? toPTT : toAudio)(file, type.ext);
            file = convert.data; pathFile = convert.filename; mtype = 'audio'; mimetype = 'audio/ogg; codecs=opus';
        } else mtype = 'document';
        if (options.asDocument) mtype = 'document';
        delete options.asSticker; delete options.asLocation; delete options.asVideo; delete options.asDocument; delete options.asImage;
        let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
        let m;
        try { m = await Lily.sendMessage(jid, message, { ...opt, ...options }); } catch (e) { m = null; }
        finally {
            if (!m) m = await Lily.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
            file = null; return m;
        }
    }

    Lily.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']
        if (mime.split("/")[1] === "gif") return Lily.sendMessage(jid, { video: await getBuffer(url), caption, gifPlayback: true, ...options }, { quoted, ...options })
        if (mime === "application/pdf") return Lily.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption, ...options }, { quoted, ...options })
        if (mime.split("/")[0] === "image") return Lily.sendMessage(jid, { image: await getBuffer(url), caption, ...options }, { quoted, ...options })
        if (mime.split("/")[0] === "video") return Lily.sendMessage(jid, { video: await getBuffer(url), caption, mimetype: 'video/mp4', ...options }, { quoted, ...options })
        if (mime.split("/")[0] === "audio") return Lily.sendMessage(jid, { audio: await getBuffer(url), caption, mimetype: 'audio/mpeg', ...options }, { quoted, ...options })
    }

    Lily.sendPoll = (jid, name = '', values = [], selectableCount = 1) => Lily.sendMessage(jid, { poll: { name, values, selectableCount } })

    Lily.ev.on('group-participants.update', async funcs => {
        await (await import('./gc.js'))["default"](Lily, funcs);
    });

    return Lily
}

// ── Startup ───────────────────────────────────────────────────────────
theFontaine()

// ── Error Handlers (jangan crash karena error kecil) ─────────────────
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err.message)
    // Jangan exit — biarkan bot tetap jalan
})

process.on('unhandledRejection', (err) => {
    const msg = err?.message || String(err);
    if (msg.includes('rate-overlimit')) return; // spam biasa, abaikan
    console.error('❌ Unhandled Rejection:', msg)
    // Jangan exit — Pterodactyl tidak perlu restart untuk ini
})

// ── Graceful Shutdown untuk Pterodactyl ──────────────────────────────
process.on('SIGINT', () => {
    console.log('\n🛑 Bot dihentikan (SIGINT).')
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.log('\n🛑 Bot dihentikan (SIGTERM).')
    process.exit(0)
})
