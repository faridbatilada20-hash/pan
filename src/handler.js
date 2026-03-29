const fs = require("fs")
const path = require("path")
const config = require("../config")

async function handleMessage(sock, msg) {
  try {
    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      ""

    const prefix = config.prefix
    if (!body.startsWith(prefix)) return

    const args = body.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    switch (command) {

      case "menu":
        require("../command/menu").run(sock, msg)
      break

      case "claim":
        require("../command/claim").run(sock, msg)
      break

      case "daily":
        require("../command/daily").run(sock, msg)
      break

      case "profile":
        require("../command/profile").run(sock, msg)
      break

      case "ping":
        require("../command/ping").run(sock, msg)
      break

      case "rvo":
        require("../command/rvo").run(sock, msg)
      break

    }

  } catch (err) {
    console.log("Error handler:", err)
  }
}

module.exports = { handleMessage }
