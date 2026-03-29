const { loadDB, saveDB } = require("../src/database")

module.exports = {
  name: "afk",
  run: async (sock, msg, args) => {

    const sender = msg.key.remoteJid
    const user = msg.key.participant || msg.key.remoteJid
    const idUser = user.split("@")[0]

    if (!args.length) {
      return sock.sendMessage(sender, {
        text: "❌ Harus pakai alasan!\nContoh: .afk tidur"
      }, { quoted: msg })
    }

    let db = loadDB()

    db[idUser] = db[idUser] || {}
    db[idUser].afk = {
      reason: args.join(" "),
      time: Date.now()
    }

    saveDB(db)

    await sock.sendMessage(sender, {
      text: `😴 Kamu sekarang AFK\nAlasan: ${db[idUser].afk.reason}`
    }, { quoted: msg })
  }
        }
