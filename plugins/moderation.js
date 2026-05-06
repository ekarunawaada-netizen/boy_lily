const fs = require('fs');
const path = require('path');

// Helper: Toggle fitur on/off ke database JSON
function toggleFeature(dbFile, chatId, currentState, featureName, replyviex) {
    try {
        let data = JSON.parse(fs.readFileSync(dbFile).toString());
        if (currentState) {
            // Turn OFF
            const idx = data.indexOf(chatId);
            if (idx > -1) data.splice(idx, 1);
            fs.writeFileSync(dbFile, JSON.stringify(data));
            replyviex(`✅ ${featureName} berhasil *dinonaktifkan* di grup ini`);
        } else {
            // Turn ON
            data.push(chatId);
            fs.writeFileSync(dbFile, JSON.stringify(data));
            replyviex(`✅ ${featureName} berhasil *diaktifkan* di grup ini`);
        }
    } catch (e) {
        console.error(`[moderation:toggle] ${featureName}`, e);
        replyviex(`Gagal mengubah setting ${featureName}`);
    }
}

module.exports = {
    name: 'moderation',
    command: [
        'autostickergc', 'autosticker',
        'antivirus', 'antivirtex',
        'antilinkytvid',
        'antilinkyoutubech', 'antilinkyoutubechannel', 'antilinkytch',
        'antilinkinstagram', 'antilinkig', 'antilinkinsta',
        'antilinkfacebook', 'antilinkfb',
        'antilinktelegram', 'antilinktelgram', 'antilinkig',
        'antilinktiktok', 'antilinktt',
        'antilinktwt', 'antilinktwitter', 'antilinktwit',
        'antilinkall',
        'antitoxic', 'antibadword',
        'antiwame',
        'antilinkch', 'antilink', 'antilinkgc',
        'antinsfw', 'autonsfw',
        'automute', 'mute', 'unmute'
    ],
    category: 'group',
    desc: 'Fitur moderasi otomatis grup (antilink, antivirus, antitoxic, dll)',
    async run(LilyBot, m, { command, args, from, mess,
        DinzTheCreator, isBotAdmins, isAdmins,
        replyviex, reply,
        // Anti-feature states dari Furina.js
        isAutoSticker, antiVirtex, AntiNsfw, isMute,
        AntiLinkYoutubeVid, AntiLinkYoutubeChannel,
        AntiLinkInstagram, AntiLinkFacebook,
        AntiLinkTelegram, AntiLinkTiktok, AntiLinkTwitter,
        AntiLinkAll, antiwame, antiToxic, Antilinkgc, Antilinkch
    }) {

        if (!m.isGroup) return reply(mess.only.group || 'Hanya bisa di grup!');
        if (!isBotAdmins) return reply('Bot harus menjadi admin terlebih dahulu!');
        if (!isAdmins && !DinzTheCreator) return reply('Khusus Admin grup!');

        const dbBase = './database/';
        const action = args[0]; // 'on' atau 'off'

        if (action !== 'on' && action !== 'off') {
            return replyviex(`Gunakan: ${command} on / off`);
        }

        switch (command) {

            // === AUTO STICKER ===
            case 'autostickergc':
            case 'autosticker':
                toggleFeature(`${dbBase}autosticker.json`, from, isAutoSticker, 'Auto Sticker', replyviex);
                break;

            // === ANTI VIRUS / VIRTEX ===
            case 'antivirus':
            case 'antivirtex': {
                toggleFeature(`${dbBase}antivirus.json`, from, antiVirtex, 'Anti Virus/Virtex', replyviex);
                if (action === 'on') {
                    const groupe = await LilyBot.groupMetadata(from);
                    const mems = groupe.participants.map(a => a.id);
                    LilyBot.sendMessage(from, {
                        text: '```「 ⚠️ Warning ⚠️ 」```\n\nAnti Virus telah aktif! Siapapun yang mengirim virus/virtex akan langsung dikick!',
                        contextInfo: { mentionedJid: mems }
                    });
                }
                break;
            }

            // === ANTI LINK YOUTUBE VIDEO ===
            case 'antilinkytvid':
                toggleFeature(`${dbBase}antilinkytvideo.json`, from, AntiLinkYoutubeVid, 'Anti Link YouTube Video', replyviex);
                break;

            // === ANTI LINK YOUTUBE CHANNEL ===
            case 'antilinkyoutubech':
            case 'antilinkyoutubechannel':
            case 'antilinkytch':
                toggleFeature(`${dbBase}antilinkytchannel.json`, from, AntiLinkYoutubeChannel, 'Anti Link YouTube Channel', replyviex);
                break;

            // === ANTI LINK INSTAGRAM ===
            case 'antilinkinstagram':
            case 'antilinkig':
            case 'antilinkinsta':
                toggleFeature(`${dbBase}antilinkinstagram.json`, from, AntiLinkInstagram, 'Anti Link Instagram', replyviex);
                break;

            // === ANTI LINK FACEBOOK ===
            case 'antilinkfacebook':
            case 'antilinkfb':
                toggleFeature(`${dbBase}antilinkfacebook.json`, from, AntiLinkFacebook, 'Anti Link Facebook', replyviex);
                break;

            // === ANTI LINK TELEGRAM ===
            case 'antilinktelegram':
            case 'antilinktelgram':
                toggleFeature(`${dbBase}antilinktelegram.json`, from, AntiLinkTelegram, 'Anti Link Telegram', replyviex);
                break;

            // === ANTI LINK TIKTOK ===
            case 'antilinktiktok':
            case 'antilinktt':
                toggleFeature(`${dbBase}antilinktiktok.json`, from, AntiLinkTiktok, 'Anti Link TikTok', replyviex);
                break;

            // === ANTI LINK TWITTER ===
            case 'antilinktwt':
            case 'antilinktwitter':
            case 'antilinktwit':
                toggleFeature(`${dbBase}antilinktwitter.json`, from, AntiLinkTwitter, 'Anti Link Twitter/X', replyviex);
                break;

            // === ANTI LINK ALL ===
            case 'antilinkall':
                toggleFeature(`${dbBase}antilinkall.json`, from, AntiLinkAll, 'Anti Link Semua Platform', replyviex);
                break;

            // === ANTI TOXIC / BADWORD ===
            case 'antitoxic':
            case 'antibadword':
                toggleFeature(`${dbBase}antitoxic.json`, from, antiToxic, 'Anti Toxic/Kata Kasar', replyviex);
                break;

            // === ANTI WAME (WhatsApp Mod/Fake) ===
            case 'antiwame':
                toggleFeature(`${dbBase}antiwame.json`, from, antiwame, 'Anti WA Mod/Unofficial', replyviex);
                break;

            // === ANTI LINK CHANNEL (WA Channel) ===
            case 'antilinkch':
                toggleFeature(`${dbBase}antilinkch.json`, from, Antilinkch, 'Anti Link Channel WhatsApp', replyviex);
                break;

            // === ANTI LINK GC (WA Group) ===
            case 'antilink':
            case 'antilinkgc':
                toggleFeature(`${dbBase}antilinkgc.json`, from, Antilinkgc, 'Anti Link Grup WhatsApp', replyviex);
                break;

            // === ANTI NSFW ===
            case 'antinsfw':
            case 'autonsfw':
                toggleFeature(`${dbBase}nsfw.json`, from, AntiNsfw, 'Anti NSFW', replyviex);
                break;

            // === MUTE / UNMUTE BOT ===
            case 'mute':
            case 'automute': {
                toggleFeature(`${dbBase}mute.json`, from, isMute, 'Mute Bot', replyviex);
                break;
            }
            case 'unmute': {
                try {
                    let muteData = JSON.parse(fs.readFileSync(`${dbBase}mute.json`).toString());
                    const idx = muteData.indexOf(m.chat);
                    if (idx > -1) {
                        muteData.splice(idx, 1);
                        fs.writeFileSync(`${dbBase}mute.json`, JSON.stringify(muteData));
                    }
                    replyviex('✅ Bot sudah di-unmute di grup ini');
                } catch (e) {
                    replyviex('Gagal unmute bot');
                }
                break;
            }
        }
    }
};
