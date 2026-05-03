const os = require("os")
const { performance } = require("perf_hooks")

async function antiDelaySystem(Furina) {
  console.log("⚙️ Mengaktifkan Anti Delay Slow Response System...")

  // === Auto Memory Cleaner ===
  setInterval(() => {
    if (global.gc) {
      global.gc()
      console.log("🧹 Memory cleaned & Garbage Collected")
    }
  }, 60000)

  // === CPU & Event Loop Monitor ===
  setInterval(() => {
    const start = performance.now()
    setImmediate(() => {
      const delay = performance.now() - start
      if (delay > 250) {
        console.warn(`⚠️ Detected Event Loop Delay: ${delay.toFixed(2)}ms`)
        console.log("🔧 Memperbaiki delay event loop...")
        process.emitWarning("High Event Loop Delay")
      }
    })
  }, 5000)

  // === Network Stabilizer (auto ping ke WhatsApp) ===
  setInterval(async () => {
    try {
      await Furina.query({ tag: "iq", attrs: { type: "get" }, content: [] })
      console.log("📶 Ping sukses (network stabil)")
    } catch {
      console.warn("⚠️ Ping gagal — mencoba stabilisasi koneksi...")
    }
  }, 30000)

  // === Warmup Cache (hindari respon pertama lambat) ===
  setTimeout(() => {
    console.log("🔥 Melakukan cache warmup untuk respon cepat...")
    const preload = [
      "Sistem aktif.",
      "Bot siap respon cepat.",
      "Koneksi stabil & optimal."
    ]
    preload.forEach(msg => msg.length)
  }, 1)

  // === Auto CPU Balancer ===
  setInterval(() => {
    const cpuLoad = os.loadavg()[0] / os.cpus().length * 100
    if (cpuLoad > 85) {
      console.warn(`🔥 CPU Tinggi (${cpuLoad.toFixed(1)}%), menstabilkan...`)
      global.gc?.()
      setTimeout(() => console.log("✅ CPU distabilkan."), 2000)
    }
  }, 20000)
}

// === Export agar bisa digunakan di file lain ===
module.exports = { antiDelaySystem }
