module.exports = {
  name: "ping",
  run: async (sock, msg) => {
    const start = Date.now()

    await sock.sendMessage(msg.key.remoteJid, {
      text: "Testing..."
    })

    const speed = Date.now() - start

    await sock.sendMessage(msg.key.remoteJid, {
      text: `⚡ Speed: ${speed} ms`
    })
  }
}
