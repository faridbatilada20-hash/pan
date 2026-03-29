const { loadDB, saveDB } = require("../src/database")

module.exports = {
  name: "claim",
  run: async (sock, msg) => {

    const sender = msg.key.remoteJid
    const idUser = sender.split("@")[0]

    let db = loadDB()
    let user = db[idUser]

    const now = Date.now()
    const cooldown = 86400000 // 1 hari

    if (now - user.lastClaim < cooldown) {
      let sisa = cooldown - (now - user.lastClaim)
      let jam = Math.floor(sisa / 3600000)
      return sock.sendMessage(sender, {
        text: `⏳ Tunggu ${jam} jam lagi`
      })
    }

    user.uang += 1000
    user.lastClaim = now

    saveDB(db)

    sock.sendMessage(sender, {
      text: "💰 Berhasil claim 1000 uang!"
    })
  }
}
