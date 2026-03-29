const { loadDB, saveDB, addUser } = require("../src/database")

module.exports = {
  name: "daily",
  run: async (sock, msg) => {

    const from = msg.key.remoteJid
    const sender = msg.key.participant || msg.key.remoteJid
    const id = sender.split("@")[0]

    addUser(id)
    let db = loadDB()

    let user = db[id]

    const now = Date.now()
    const cooldown = 86400000 // 24 jam

    if (now - user.lastClaim < cooldown) {
      let sisa = cooldown - (now - user.lastClaim)

      let jam = Math.floor(sisa / (1000 * 60 * 60))
      let menit = Math.floor((sisa % (1000 * 60 * 60)) / (1000 * 60))
      let detik = Math.floor((sisa % (1000 * 60)) / 1000)

      return sock.sendMessage(from, {
        text: `⏳ Kamu sudah claim hari ini!\nTunggu ${jam} jam ${menit} menit ${detik} detik lagi`
      })
    }

    // 💰 uang random
    let uang = Math.floor(Math.random() * 5000) + 1000 // 1000 - 6000

    user.uang += uang
    user.lastClaim = now

    saveDB(db)

    await sock.sendMessage(from, {
      text: `🎁 DAILY REWARD\n\n+${uang} uang 💰\n\nSaldo kamu sekarang: ${user.uang}`
    })
  }
  }
