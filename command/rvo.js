module.exports = {
  name: "rvo",
  run: async (sock, msg) => {

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (!quoted || !quoted.imageMessage) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "Reply foto dengan .rvo"
      })
    }

    const media = quoted.imageMessage

    await sock.sendMessage(msg.key.remoteJid, {
      image: media
    })
  }
}
