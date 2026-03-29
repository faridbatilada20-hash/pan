const config = require("../config")
const { loadDB, saveDB } = require("../src/database")

async function handleMessage(sock, msg) {
  try {
    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      ""

    const sender = msg.key.remoteJid
    const user = msg.key.participant || msg.key.remoteJid
    const idUser = user.split("@")[0]

    const prefix = config.prefix

    let db = loadDB()
    db[idUser] = db[idUser] || {}

    // ================= COMMAND =================
    if (body.startsWith(prefix)) {
      const args = body.slice(prefix.length).trim().split(/ +/)
      const command = args.shift().toLowerCase()

      switch (command) {

        case "afk":
          require("../command/afk").run(sock, msg, args)
        break

        case "menu":
          require("../command/menu").run(sock, msg)
        break

        case "claim":
          require("../command/claim").run(sock, msg)
        break

        case "daily":
          require("../command/daily").run(sock, msg)
        break

        case "profile":
          require("../command/profile").run(sock, msg)
        break

        case "ping":
          require("../command/ping").run(sock, msg)
        break

        case "rvo":
          require("../command/rvo").run(sock, msg)
        break

      }

      return // ⛔ penting
    }

    // ================= AFK BALIK =================
    if (db[idUser]?.afk) {
      const afkTime = Date.now() - db[idUser].afk.time

      const seconds = Math.floor(afkTime / 1000) % 60
      const minutes = Math.floor(afkTime / (1000 * 60)) % 60
      const hours = Math.floor(afkTime / (1000 * 60 * 60)) % 24
      const days = Math.floor(afkTime / (1000 * 60 * 60 * 24))

      let waktu = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`

      await sock.sendMessage(sender, {
        text: `👋 Kamu sudah tidak AFK\nAlasan: ${db[idUser].afk.reason}\nSelama: ${waktu}`
      }, { quoted: msg })

      delete db[idUser].afk
      saveDB(db)
    }

    // ================= CEK TAG ORANG AFK =================
    const mention = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []

    for (let jid of mention) {
      let id = jid.split("@")[0]

      if (db[id]?.afk) {
        const afkTime = Date.now() - db[id].afk.time

        const seconds = Math.floor(afkTime / 1000) % 60
        const minutes = Math.floor(afkTime / (1000 * 60)) % 60
        const hours = Math.floor(afkTime / (1000 * 60 * 60)) % 24
        const days = Math.floor(afkTime / (1000 * 60 * 60 * 24))

        let waktu = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`

        await sock.sendMessage(sender, {
          text: `😴 @${id} sedang AFK\nAlasan: ${db[id].afk.reason}\nSejak: ${waktu}`,
          mentions: [jid]
        }, { quoted: msg })
      }
    }

  } catch (err) {
    console.log("Error handler:", err)
  }
}

module.exports = { handleMessage }
