const axios = require("axios")

async function sendFakeDoc(sock, jid, teks, title, sender) {

  let ppuser

  try {
    // ambil foto profil user
    ppuser = await sock.profilePictureUrl(sender, "image")
  } catch {
    // fallback kalau user ga ada foto
    ppuser = "https://i.ibb.co/0jqHpnp/avatar.png"
  }

  const thumbnail = await axios.get(ppuser, {
    responseType: "arraybuffer"
  }).then(res => res.data)

  await sock.sendMessage(jid, {
    document: Buffer.from("Pan Bot"),
    mimetype: "application/pdf",
    fileName: title, // ini jadi tulisan atas (Selamat Pagi dll)
    caption: teks,
    jpegThumbnail: thumbnail
  })
}

module.exports = { sendFakeDoc }
