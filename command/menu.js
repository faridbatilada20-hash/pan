const { sendFakeDoc } = require("../lib/fakeDoc")
const { loadDB, addUser } = require("../src/database")
const config = require("../config")

module.exports = {
  name: "menu",
  run: async (sock, msg) => {

    const sender = msg.key.remoteJid
    const pushName = msg.pushName || "User"
    const idUser = sender.split("@")[0]

    addUser(idUser)
    let db = loadDB()

    const now = new Date()
    const jam = now.getHours()

    let ucapan = ""
    if (jam < 12) ucapan = "Selamat Pagi 🌅"
    else if (jam < 15) ucapan = "Selamat Siang ☀️"
    else if (jam < 18) ucapan = "Selamat Sore 🌇"
    else ucapan = "Selamat Malam 🌙"

    const teks = `Halo ${pushName}

Uang kamu: ${db[idUser]?.uang || 0}

Menu:
.claim
.ping
.rvo`

    await sendFakeDoc(sock, sender, teks, ucapan, [sender])
  }
}
