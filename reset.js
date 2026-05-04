/**
 * reset.js — Script Reset Data Global (Fresh Start)
 * Jalankan: node reset.js
 * 
 * PERINGATAN: Ini akan menghapus SEMUA data user & grup di MongoDB dan JSON lokal!
 */

'use strict'

require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const { User, Group } = require('./lib/schema')

async function main() {
    console.log('🧹 Memulai proses reset data global (Users & Groups)...')

    // 1. Reset MongoDB
    const uri = process.env.MONGO_URI
    if (uri) {
        console.log('🔌 Menghubungkan ke MongoDB...')
        await mongoose.connect(uri)
        
        console.log('🗑 Menghapus semua dokumen di koleksi Users...')
        await User.deleteMany({})
        console.log('✅ MongoDB Users cleared.')

        console.log('🗑 Menghapus semua dokumen di koleksi Groups...')
        await Group.deleteMany({})
        console.log('✅ MongoDB Groups cleared.')
        
        await mongoose.disconnect()
    }

    // 2. Reset database/database.json
    const dbPath = './database/database.json'
    if (fs.existsSync(dbPath)) {
        console.log('📂 Mereset users di database.json...')
        let db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
        db.users = {}
        db.chats = {} // Reset chats juga
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
        console.log('✅ database.json cleared.')
    }

    // 3. Reset file JSON user & grup lainnya
    const otherFiles = [
        './database/registered.json',
        './database/premium.json',
        './database/user.json',
        './database/commandUser.json',
        // Group files
        './database/welcome.json',
        './database/left.json',
        './database/set_done.json',
        './database/set_left.json',
        './database/set_proses.json',
        './database/set_welcome.json',
        './database/mute.json',
        './database/nsfw.json',
        './database/antilinkall.json',
        './database/antilinkch.json',
        './database/antilinkfacebook.json',
        './database/antilinkgc.json',
        './database/antilinkinstagram.json',
        './database/antilinktelegram.json',
        './database/antilinktiktok.json',
        './database/antilinktwitter.json',
        './database/antilinkytchannel.json',
        './database/antilinkytvideo.json',
        './database/antitoxic.json',
        './database/antivirus.json',
        './database/antiwame.json',
        './database/autosticker.json',
        './database/openaigc.json',
        './database/simi.json',
        './database/chatDinzID.json'
    ]

    otherFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`📂 Mereset ${file}...`)
            // Beberapa file menggunakan {} (objek), beberapa [] (array)
            // Tapi untuk reset fresh, [] atau {} tergantung pemakaian aslinya.
            // Kebanyakan file grup di sini adalah Array JID.
            const content = file.endsWith('.json') && fs.readFileSync(file, 'utf-8').trim().startsWith('{') ? {} : []
            fs.writeFileSync(file, JSON.stringify(content, null, 2))
            console.log(`✅ ${file} cleared.`)
        }
    })

    console.log('\n✨ SEMUA DATA USER & GRUP TELAH DIRESET. Bot sekarang "Fresh" total.')
    process.exit(0)
}

main().catch(err => {
    console.error('❌ Error saat reset:', err)
    process.exit(1)
})

