const { loadDB, saveDB, addUser } = require("./database")

async function handleMessage(sock, msg) {
  try {
    const from = msg.key.remoteJid
    const sender = msg.key.participant || msg.key.remoteJid
    const id = sender.split("@")[0]

    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      ""

    if (!body.startsWith(".")) return

    const command = body.slice(1).trim().split(" ")[0].toLowerCase()

    addUser(id)

    // ================== COMMAND ==================
    switch (command) {

      case "menu":
        require("../command/menu").run(sock, msg)
      break

      case "claim":
        require("../command/claim").run(sock, msg)
      break

      // 🔥 INI YANG KAMU MAU (DITAMBAHIN DOANG)
      case "daily":
        require("../command/daily").run(sock, msg)
      break

      case "ping":
        require("../command/ping").run(sock, msg)
      break

      case "rvo":
        require("../command/rvo").run(sock, msg)
      break

    }

  } catch (err) {
    console.log(err)
  }
}

module.exports = { handleMessage }
