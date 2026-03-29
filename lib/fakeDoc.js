async function sendFakeDoc(sock, jid, teks, ucapan, mentions = []) {
  await sock.sendMessage(jid, {
    document: { url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    mimetype: "application/pdf",
    fileName: ucapan,
    title: ucapan,
    fileLength: 1000000000,
    pageCount: 100,
    caption: teks,
    contextInfo: {
      mentionedJid: mentions,
      externalAdReply: {
        title: "pan bot",
        body: "Bot WhatsApp",
        thumbnailUrl: "https://files.catbox.moe/5h6g1x.jpg",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

module.exports = { sendFakeDoc }
