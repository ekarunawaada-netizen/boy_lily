const chalk = require("chalk")
const fs = require("fs")
require('dotenv').config()
//aumto presence update
global.autoTyping = false //auto tying in gc (true to on, false to off)
global.autoRecord = false //auto recording (true to on, false to off)
global.autoblockmorroco = true //auto block 212 (true to on, false to off)
global.autokickmorroco = true //auto kick 212 (true to on, false to off) 
global.antispam = true//auto kick spammer (true to on, false to off)
global.status = false
global.kirsan = false
//////////////////////////////////////////////////////////////////////////////////

//BATAS//
//=========GLOBAL MY=========//
global.my = {
    yt: "https://youtube.com/@fallxd78110", //ubah saja terserah 
    ch: "https://whatsapp.com/channel/0029Vb7WoIXJf05c6lVZxD2X", //ubah saja sama link channel lu
    idch: "120363186130999681@newsletter" //ubah idch lu
}
////////////////////////////////////////////////////////////////////////////////

//==========SETTING DELAY JPM==========//
global.delayJpm = 7000
//=====================================//
//=========UBAH BAGIAN THUMBNAIL MENU & ALLMENU==========//
global.gif = './data/image/yoimiya.mp4' // Use path instead of buffer
    global.thumbnail = 'https://files.catbox.moe/yng1lr.jpg', //THUMB MENU KALIAN
    global.dinzmenu = 'https://files.catbox.moe/b0j8ps.jpg', //THUMB MENU button KALIAN
    /////////////////////////////////////////////////////////////////////////////////
    global.setwel = "https://img1.pixhost.to/images/8859/642894040_lily.jpg"

global.frch = ["48ff6e64f25bb5d566a603e40906c3b8e6392d961f4905f77887762b7bf03409",
    "Isi Apikeys Mu" // Dapatkan apikey di https://asitha.top/login?ref=hillaryy2555
]
/////////////////////// WELCOME SETTINGS ///////////////
global.welcome = true
/////////////////////////////////////////////////////////////////////////////////


///////////////////)/)) FAKE REPLY/FAKE QUOTED //////////////////))/
global.replyDinzID = 'https://files.catbox.moe/9lkwtv.jpg'
global.replydinz = 'https://files.catbox.moe/b7m6c0.jp'
global.replyin = 'https://files.catbox.moe/9lkwtv.jpg'
global.replyviex = 'https://files.catbox.moe/9lkwtv.jpg'
/////////////////////////////////////////////////////////////////////////////////


//////////////////////SETTING TAMPILAN MENU KALIAN//////////////////
global.ig = '@kaaphiww' //NAMA IG LU
global.yt = 'KaaPhiww' //NAMA YT LU, KALO GADA GAUSAH DIISI
global.namaBot = "Lily | MD✨" // Ganti aja
global.namabot = "Lily | MD✨" // Ganti serah lu
global.footer = "KaaPhiww | ᴅᴇᴠ" //Ganti aja serah
global.ttowner = '@kaaphiww' //NAMA TIKTOK LU
global.namafile = 'Lily 🛍' // Ganti aja
global.ownername = 'KaaPhiww' //NAMA LU
global.owner = ['6289523888644'] // SETTING JUGA DI FOLDER DATABASE 
global.ownernomer = '6289523888644' // NOMOR LU YANG MAU JDI OWNER
global.socialm = 'GitHub: -'
global.location = 'Indonesia'
global.nameCreator = 'KaaPhiww'
/////////////////////////////////////////////////////////////////////////////////



//=================SETTING PAYMENT KALIAN===================\\
global.nodana = '085813708397' // KOSONG KAN JIKA TIDAK ADA
global.nogopay = '085813708397' // KOSONG KAN JIKA TIDAK ADA 
global.noovo = '085813708397' // KOSONG KAN JIKA TIDAK ADA
/////////////////////////////////////////////////////////////////////////////////



//==============SETTING PAYMENT NAME=======================\\
global.andana = '085813708397' // KOSONG KAN JIKA TIDAK ADA
global.angopay = '085813708397' // KOSONG KAN JIKA TIDAK ADA
global.anovo = '085813708397' // KOSONG KAN JIKA TIDAK ADA
//////////////////////////////////////////////////////////////////////////////////

//BATAS//
global.settings = {
    autoreact: false
}
// Pick random emoji react status
global.emoji = [
    "🥶",
    "🙄",
    "😳",
    "😒",
    "🥰",
    "😎",
    "🫣",
    "😍",
    "😨",
    "😁",
    "👀",
    "👿",
    "🤖",
    "😮",
    "🗿",
    "😹",
    "😘",
    "🥺"
]
//==================SETTING BOT===========================\\
global.botname = process.env.BOT_NAME || "Lily | MD ✨" //NAMA BOT LU
global.ownernumber = process.env.OWNER_NUMBER || '6289523888644' //NOMOR LU
global.botnumber = '628135339529' //NOMOR LU
global.ownername = 'KaaPhiww | ᴅᴇᴠ' //NAMA LU
global.idSaluran = "120363186130999681@newsletter"//ID SALURAN LU
global.idch = "120363186130999681@newsletter"//ID SALURAN LU
global.chat = '120363186130999681@newsletter' // Ganti idch buat command .chat
global.namaSaluran = "Lily Assistant • Bot WhatsApp" //Ganti sama nama saluran lu
global.linkSaluran = "https://whatsapp.com/channel/0029Vb7WoIXJf05c6lVZxD2X"
global.ownerNumber = [`${process.env.OWNER_NUMBER || '6289523888644'}@s.whatsapp.net`] //NOMORLU
global.ownerweb = ""//WEB LU//OPSIONAL
global.websitex = ""//OPSIONAL
global.wagc = "https://chat.whatsapp.com/KBeOpfm2Wyw62ImBHypEUx"
global.wach = 'https://whatsapp.com/channel/0029Vb7WoIXJf05c6lVZxD2X'
global.saluran = "https://whatsapp.com/channel/0029Vb7WoIXJf05c6lVZxD2X"
global.themeemoji = '🪀'
global.wm = "Lily X KaaPhiww"
global.botscript = 'MAAS MAF INI BELI YAA :D'
global.version = "1.0.0"
global.packname = "🛒 KaaPhiww"
global.author = "\n\nCreate by Lily MD\n Dev : KaaPhiww"
global.creator = "6289523888644@s.whatsapp.net"
/////////////////////////////////////////////////////////////////////////////////



//================== CPANEL FITUR ==========================\\
global.domain = process.env.DOMAIN || 'https://go.viexshop.web.id' // Isi Domain Lu jangan kasih tanda / di akhir link
global.apikey = process.env.APIKEY || 'ptla_T8FgpXYdNWqvBZOUdX4OsIGF68uiWYd11hn36BJXdLJ' // Isi Apikey Plta Lu
global.capikey = process.env.CAPIKEY || 'ptlc_iJTCLZmhVrfrgYZ1BaceXC1hgotj5WfGhHxMvTK0DtS' // Isi Apikey Pltc Lu
/////////////////////////////////////////////////////////////////////////////////



///////////////////Server create panel egg pm2 ///////////////////////
global.apikey2 = process.env.APIKEY2 || 'ptla_T8FgpXYdNWqvBZOUdX4OsIGF68uiWYd11hn36BJXdLJ' // Isi Apikey Plta Lu
global.capikey2 = process.env.CAPIKEY2 || 'ptlc_iJTCLZmhVrfrgYZ1BaceXC1hgotj5WfGhHxMvTK0DtS' // Isi Apikey Pltc Lu
global.domain2 = process.env.DOMAIN2 || 'https://go.viexshop.web.id' // Isi Domain Lu
global.docker2 = "ghcr.io/cekilpedia/vip:sanzubycekil" //jangan di ubah
global.eggsnya2 = '15' // id eggs yang dipakai
global.location2 = '1' // id location
/////////////////////////////////////////////////////////////////////////////////
global.domainotp = process.env.DOMAIN_OTP || "https://claudeotp.com/api"
global.apikeyotp = process.env.APIKEY_OTP || "a395f97fe99f4fad0e790d10af518b9a"
global.eggsnya = '15' // id eggs yang dipakai
global.location3 = '1' // id location
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.tekspushkonv3 = ""
global.tekspushkonv4 = ""
/////////////////////////////////////////////////////////////////////////////////

//BATAS//

/////////////////////////////////////////////////////////////////////////////////
global.mess = {
    wait: "*[ LilyMD ]* Tunggu bentar ya sayang.......",
    error: "*[ LilyMD ]* Maaf ada error dikit",
    success: "*[ LilyMD ]* Nih sukses bng",
    on: "*[ LilyMD ]* Sudah aktif",
    off: "*[ LilyMD ]* Sudah mati",
    done: "*[ LilyMD ]* Done nih Bang",
    query: {
        text: "ᴛᴇᴋs ɴʏᴀ ᴍᴀɴᴀ ᴋᴀᴋ ?",
        link: "ʟɪɴᴋ ɴʏᴀ ᴍᴀɴᴀ ᴋᴀᴋ ?",
    },
    error: {
        fitur: "ᴍᴏʜᴏɴ ᴍᴀᴀғ ᴋᴀᴋ ғɪᴛᴜʀ ᴇʀᴏʀ sɪʟᴀʜᴋᴀɴ ᴄʜᴀᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ ᴀɢᴀʀ ʙɪsᴀ sᴇɢᴇʀᴀ ᴅɪᴘᴇʀʙᴀɪᴋɪ",
    },
    only: {
        group: " ʏᴀʜ ᴍᴀᴀғ ᴋᴀᴋ ғɪᴛᴜʀ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ",
        private: "ʏᴀʜ ᴍᴀᴀғ ᴋᴀᴋ ғɪᴛᴜʀ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴅᴀʟᴀᴍ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ",
        owner: "ᴍᴀᴀғ ᴋᴀᴋ ғɪᴛᴜʀ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ sᴀᴍᴀ ᴏᴡɴᴇʀ ʙᴏᴛ",
        admin: "ᴍᴀᴀғ ᴋᴀᴋ ғɪᴛᴜʀ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ sᴀᴍᴀ ᴏᴡɴᴇʀ ʙᴏᴛ",
        badmin: "ᴍᴀᴀғ ᴋᴀᴋ ᴋᴀʏᴀ ɴʏᴀ ᴋᴀᴋᴀᴋ ᴛɪᴅᴀᴋ ʙɪsᴀ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ ᴅɪ ᴋᴀʀᴇɴᴀᴋᴀɴ ʙᴏᴛ ʙᴜᴋᴀɴ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ",
        premium: "ᴍᴀᴀғ ᴋᴀᴍᴜ ʙᴇʟᴏᴍ ᴍᴇɴᴊᴀᴅɪ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴅɪ ᴘʀᴇᴍɪᴜᴍ sɪʟᴀᴋᴀɴ ʙᴇʟɪ ᴅɪ ᴏᴡɴᴇʀ ᴅᴇɴɢᴀɴ ᴄᴀʀᴀ ᴋᴇᴛɪᴋ  .ᴏᴡɴᴇʀ",
    }
}
//========================================\\
global.decor = {
    menut: '❏═┅═━–〈',
    menub: '┊•',
    menub2: '┊',
    menuf: '┗––––––––––✦',
    hiasan: '꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷',

    menut: '––––––『',
    menuh: '』––––––',
    menub: '┊☃︎ ',
    menuf: '┗━═┅═━––––––๑\n',
    menua: '',
    menus: '☃︎',

    htki: '––––––『',
    htka: '』––––––',
    haki: '┅━━━═┅═❏',
    haka: '❏═┅═━━━┅',
    lopr: 'Ⓟ',
    lolm: 'Ⓛ',
    htjava: '❃'
}

//===========================//

global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            atm: '💳',
            money: '💰',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            makanancentaur: "🥗",
            makanangriffin: "🥙",
            makanankyubi: "🍗",
            makanannaga: "🍖",
            makananpet: "🥩",
            makananphonix: "🧀",
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            robo: '🤖',
            petfood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰',
            bibitanggur: '🌱',
            bibitjeruk: '🌿',
            bibitapel: '☘️',
            bibitmangga: '🍀',
            bibitpisang: '🌴',
            anggur: '🍇',
            jeruk: '🍊',
            apel: '🍎',
            mangga: '🥭',
            pisang: '🍌',
            botol: '🍾',
            kardus: '📦',
            kaleng: '🏮',
            plastik: '📜',
            gelas: '🧋',
            chip: '♋',
            umpan: '🪱',
            naga: "🐉",
            phonix: "🦅",
            kyubi: "🦊",
            griffin: "🦒",
            centaur: "🎠",
            skata: '🧩'
        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
        if (!results.length) return ''
        else return emot[results[0][0]]
    }
}

//new
global.prefix = ['.']
global.sessionName = 'session' // Jangan di ubah takut nanti error
global.hituet = 0
//media target
global.thum = "./data/image/thumb.jpg" // Use path
global.log0 = "./data/image/thumb.jpg" // Use path
global.err4r = "./data/image/thumb.jpg" // Use path
global.thumb = "./data/image/thumb.jpg" // Use path
global.filename = "©ᴛʀᴀᴅᴢ | ᴅᴇᴠ"
global.defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60' //default pp wa

//menu image maker
global.flaming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.fluming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flarun = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flasmurf = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=smurfs-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='

global.keyopenai = process.env.OPENAI_KEY || "pk-pIWAlRroXTOAigkWdHcYvmlmgzEQXuoMWbVAaLAVZswSRbEB"
//documents variants
global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
