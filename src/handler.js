const fs = require("fs")
const path = require("path")
const config = require("../config")

const commands = {}

// load semua command
const commandFiles = fs.readdirSync(path.join(__dirname, "../command"))
for (const file of commandFiles) {
  const cmd = require(`../command/${file}`)
  commands[cmd.name] = cmd
}

async function handleMessage(sock, msg) {
  const body =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ""

  if (!body.startsWith(config.prefix)) return

  const args = body.slice(config.prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (commands[command]) {
    commands[command].run(sock, msg, args)
  }
}

module.exports = { handleMessage }
