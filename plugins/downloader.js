const { tiktokDl } = require('../scrape/scraper1'); // Asumsikan scraper ada di sini
const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require('lily-baileys');

module.exports = {
    name: 'tiktok',
    command: ['tt', 'tiktokdl', 'igdl', 'igvideo', 'igimage', 'igvid', 'igimg'],
    category: 'downloader',
    desc: 'Download media dari Tiktok dan Instagram',
    async run(DinzBotz, m, { command, args, text, q, prefix, mess, replyviex }) {
        if (!text || !text.startsWith("http")) return replyviex(`Contoh: ${prefix}${command} https://...`);
        
        await m.reply(mess.wait);
        
        try {
            if (['igdl', 'igvideo', 'igimage', 'igvid', 'igimg'].includes(command)) {
                await DinzBotz.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
                let media = await (await fetch(`https://endpoint.web.id/downloader/instagram?key=${global.key}&url=${text}`)).json();
                let data = media.result;
                if (data.videoUrl) {
                    await DinzBotz.sendMessage(m.chat, { video: { url: data.videoUrl }, caption: "success kak", mimetype: "video/mp4" }, { quoted: m });
                } else if (data.imageUrl) {
                    await DinzBotz.sendMessage(m.chat, { image: { url: data.imageUrl }, caption: "success kak", mimetype: "image/jpeg" }, { quoted: m });
                } else {
                    replyviex("Media tidak ditemukan!");
                }
                return;
            }

            if (['tiktok', 'tt', 'tiktokdl'].includes(command)) {
                let momok = "`𝗧 𝗜 𝗞 𝗧 𝗢 𝗞 - 𝗗 𝗢 𝗪 𝗡 𝗟 𝗢 𝗔 𝗗`";
            const result = await tiktokDl(q);
            await DinzBotz.sendMessage(m.chat, { react: { text: "🕖", key: m.key } });

            if (!result.status) return replyviex("Error!");

            if (result.durations == 0 && result.duration == "0 Seconds") {
                let araara = [];
                let urutan = 0;
                for (let a of result.data) {
                    let imgsc = await prepareWAMessageMedia({ image: { url: `${a.url}` } }, { upload: DinzBotz.waUploadToServer });
                    araara.push({
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            title: `Foto Slide Ke *${urutan += 1}*`,
                            hasMediaAttachment: true,
                            ...imgsc
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                            buttons: [{
                                name: "cta_url",
                                buttonParamsJson: `{"display_text":"Link Tautan Foto","url":"${a.url}","merchant_url":"https://www.google.com"}`
                            }]
                        })
                    });
                }
                const msgii = await generateWAMessageFromContent(m.chat, {
                    viewOnceMessageV2Extension: {
                        message: {
                            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                body: proto.Message.InteractiveMessage.Body.fromObject({ text: "*TIKTOK - DOWNLOADER*" }),
                                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: araara })
                            })
                        }
                    }
                }, { userJid: m.sender, quoted: m });
                await DinzBotz.relayMessage(m.chat, msgii.message, { messageId: msgii.key.id });
            } else {
                let urlVid = result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark");
                if (!urlVid) return replyviex("Video tidak ditemukan.");
                
                await DinzBotz.sendMessage(m.chat, {
                    video: { url: urlVid.url },
                    caption: momok,
                    footer: `\n${global.botname}`,
                    buttons: [{
                        buttonId: `.ttaudio ${text}`,
                        buttonText: { displayText: "ᴀᴍʙɪʟ ᴍᴜsɪᴋɴʏᴀ" }
                    }],
                    viewOnce: true
                }, { quoted: m });
            }
            await DinzBotz.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            }
        } catch (error) {
            console.error(error);
            m.reply('Terjadi kesalahan saat memproses permintaan.');
        }
    }
}
