module.exports = {
  name: "rvo",
  run: async (sock, msg) => {

    const from = msg.key.remoteJid

    const quotedMsg = msg.message?.extendedTextMessage?.contextInfo

    if (!quotedMsg) {
      return sock.sendMessage(from, { text: "Reply foto sekali lihat!" })
    }

    const quoted = quotedMsg.quotedMessage

    if (!quoted?.viewOnceMessage) {
      return sock.sendMessage(from, { text: "Itu bukan view once!" })
    }

    try {
      // 🔥 INI YANG BENAR
      const buffer = await sock.downloadMediaMessage({
        key: {
          remoteJid: from,
          id: quotedMsg.stanzaId,
          participant: quotedMsg.participant
        },
        message: quoted.viewOnceMessage.message
      })

      // cek tipe
      if (quoted.viewOnceMessage.message.imageMessage) {
        await sock.sendMessage(from, {
          image: buffer,
          caption: "👀 ViewOnce berhasil dibuka!"
        })
      } else {
        await sock.sendMessage(from, {
          video: buffer,
          caption: "👀 ViewOnce berhasil dibuka!"
        })
      }

    } catch (err) {
      console.log(err)
      await sock.sendMessage(from, { text: "❌ Gagal ambil media!" })
    }
  }
}
