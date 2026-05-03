/**
 * ── Session Utilities ────────────────────────────────────────────────
 * VERSI BERSIH — Tanpa backup/restore otomatis yang menyebabkan konflik
 * Hanya berisi:
 *   ✅ cleanTempFiles() — bersihkan file media temp berkala
 * ─────────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const TEMP_DIRS       = [
    path.join(__dirname, '../tmp'),
    path.join(__dirname, '../temp'),
];
const TEMP_EXTENSIONS = ['.mp4', '.mp3', '.webp', '.jpg', '.png', '.gif', '.zip', '.opus', '.bin'];

// ── Helper log ────────────────────────────────────────────────────────

function log(msg) {
    const time = new Date().toLocaleTimeString('id-ID');
    console.log(`\x1b[36m[SessionUtil ${time}]\x1b[0m ${msg}`);
}

// ── Temp File Cleanup ─────────────────────────────────────────────────

/**
 * Hapus file media temporary yang dibuat bot tapi tidak terhapus.
 * Aman dipanggil secara berkala (misal: setiap 30 menit).
 */
function cleanTempFiles() {
    let cleaned = 0;
    const libDir = path.join(__dirname, '../lib');

    // Bersihkan file temp numerik di ./lib (dari getFile() di index.js)
    if (fs.existsSync(libDir)) {
        const files = fs.readdirSync(libDir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (TEMP_EXTENSIONS.includes(ext)) {
                const filePath = path.join(libDir, file);
                try {
                    const stat = fs.statSync(filePath);
                    const ageMs = Date.now() - stat.mtimeMs;
                    if (ageMs > 5 * 60 * 1000) { // hanya hapus jika > 5 menit
                        fs.unlinkSync(filePath);
                        cleaned++;
                    }
                } catch { /* skip jika gagal */ }
            }
        }
    }

    // Bersihkan tmp/ dan temp/
    for (const dir of TEMP_DIRS) {
        if (!fs.existsSync(dir)) continue;
        try {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                try {
                    fs.unlinkSync(filePath);
                    cleaned++;
                } catch { /* skip */ }
            }
        } catch { /* skip */ }
    }

    if (cleaned > 0) log(`🧹 Hapus ${cleaned} file temp`);
}

module.exports = {
    cleanTempFiles,
};
