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

    const teks = `╭──❍「 USER INFO 」❍
├ Nama : ${pushName}
├ Id : @${idUser}
├ User : VIP
├ Limit : VIP
├ Uang : ${db[idUser].uang}
╰──|──❍
╭──❍「 BOT INFO 」❍
├ Nama Bot : ${config.botName}
├ Owner : ${config.owner}
├ Mode : ${config.mode}
├ Prefix : ${config.prefix}
╰──|─❍
╭──❍「 MENU 」❍
│➤ .claim
│➤ .ping
│➤ .rvo
╰────❍`

    await sendFakeDoc(sock, sender, teks, ucapan, [sender])
  }
}
