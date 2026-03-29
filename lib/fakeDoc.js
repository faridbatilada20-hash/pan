const axios = require("axios")

async function sendFakeDoc(sock, jid, teks, title, sender) {

  let ppuser
  try {
    ppuser = await sock.profilePictureUrl(sender, "image")
  } catch {
    ppuser = "https://i.ibb.co/0jqHpnp/avatar.png"
  }

  await sock.sendMessage(jid, {
    document: Buffer.from("Pan Bot"),
    mimetype: "application/pdf",
    fileName: title,
    caption: teks,
    contextInfo: {
      externalAdReply: {
        title: "pan bot",
        body: "Bot WhatsApp",
        mediaType: 1,
        renderLargerThumbnail: true, // 🔥 INI KUNCINYA
        thumbnailUrl: ppuser, // foto user jadi gede
        sourceUrl: "https://github.com" // bebas
      }
    }
  })
}

module.exports = { sendFakeDoc }
