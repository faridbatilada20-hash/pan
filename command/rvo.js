module.exports = {
  name: "rvo",
  run: async (sock, msg) => {

    const from = msg.key.remoteJid

    // ambil pesan yang direply
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (!quoted) {
      return sock.sendMessage(from, { text: "Reply foto 1x lihat dengan .rvo" })
    }

    // cek viewOnce
    let viewOnce = quoted.viewOnceMessage?.message

    if (!viewOnce) {
      return sock.sendMessage(from, { text: "Itu bukan foto sekali lihat!" })
    }

    // ambil image/video
    let media = viewOnce.imageMessage || viewOnce.videoMessage

    if (!media) {
      return sock.sendMessage(from, { text: "Media tidak ditemukan!" })
    }

    try {
      // download media
      const buffer = await sock.downloadMediaMessage({
        message: viewOnce
      })

      // kirim ulang sebagai biasa (bukan view once)
      if (viewOnce.imageMessage) {
        await sock.sendMessage(from, { image: buffer, caption: "Berhasil buka viewOnce 👀" })
      } else {
        await sock.sendMessage(from, { video: buffer, caption: "Berhasil buka viewOnce 👀" })
      }

    } catch (err) {
      console.log(err)
      sock.sendMessage(from, { text: "Gagal ambil media!" })
    }
  }
}
