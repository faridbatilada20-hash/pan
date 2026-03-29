const { loadDB, addUser } = require("../src/database")

module.exports = {
  name: "profile",
  run: async (sock, msg) => {

    const sender = msg.key.remoteJid
    const user = msg.key.participant || msg.key.remoteJid
    const idUser = user.split("@")[0]
    const pushName = msg.pushName || "User"

    // ambil / buat user
    addUser(idUser)
    const db = loadDB()

    // ambil foto profil
    let ppuser
    try {
      ppuser = await sock.profilePictureUrl(user, "image")
    } catch {
      ppuser = "https://i.ibb.co/0jqHpnp/avatar.png"
    }

    // teks profile
    const teks = `╭──❍「 PROFILE 」❍
├ Nama : ${pushName}
├ Nomor : ${idUser}
├ Uang : ${db[idUser].uang}
╰────❍`

    // kirim foto + caption + reply
    await sock.sendMessage(sender, {
      image: { url: ppuser },
      caption: teks
    }, {
      quoted: msg // 🔥 biar reply pesan .profile
    })
  }
  }
