require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { SupabaseUpload } = require('./lib/uploader');

const MEDIA_DIR = path.join(__dirname, 'data', 'DinzIDMedia');
const BUCKET = 'Bot_asset';

/**
 * Recursive function to get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function migrateAssets() {
  console.log('🖼️ Memulai migrasi aset dari data/DinzIDMedia ke Supabase Storage...');

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error('❌ Direktori data/DinzIDMedia tidak ditemukan!');
    return;
  }

  const allFiles = getAllFiles(MEDIA_DIR);
  console.log(`📦 Menemukan ${allFiles.length} file untuk diunggah.`);

  let successCount = 0;
  let failCount = 0;

  for (const filePath of allFiles) {
    const relativePath = path.relative(MEDIA_DIR, filePath).replace(/\\/g, '/');
    console.log(`📤 Uploading: ${relativePath}...`);

    try {
      // Kita gunakan SupabaseUpload yang sudah kita buat
      // Kita modifikasi sedikit uploader.js nanti jika perlu untuk menerima path custom di bucket
      // Tapi untuk sekarang kita simpan saja dengan nama file unik atau path aslinya
      
      const buffer = fs.readFileSync(filePath);
      const { supabase } = require('./lib/supabase');
      const { fromBuffer } = require('file-type');
      const fileType = await fromBuffer(buffer);
      
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(relativePath, buffer, {
          contentType: fileType?.mime || 'application/octet-stream',
          upsert: true
        });

      if (error) throw error;
      
      successCount++;
      console.log(`✅ Berhasil: ${relativePath}`);
    } catch (err) {
      failCount++;
      console.error(`❌ Gagal: ${relativePath} -> ${err.message}`);
    }
  }

  console.log(`\n🎉 MIGRASI ASET SELESAI!`);
  console.log(`✅ Berhasil: ${successCount}`);
  console.log(`❌ Gagal: ${failCount}`);
}

migrateAssets().catch(console.error);
