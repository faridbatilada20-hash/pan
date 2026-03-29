const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys")

const readline = require("readline")
const { handleMessage } = require("./src/handler")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(text) {
  return new Promise(resolve => rl.question(text, resolve))
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    auth: state,
    version
  })

  sock.ev.on("creds.update", saveCreds)

  if (!sock.authState.creds.registered) {
    let nomor = await question("Masukkan nomor WhatsApp (628xxx): ")
    nomor = nomor.replace(/[^0-9]/g, "")

    const code = await sock.requestPairingCode(nomor)

    console.log("\n🔥 Pairing Code:")
    console.log(code)
    rl.close()
  }

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "close") {
      let reason = lastDisconnect?.error?.output?.statusCode

      if (reason === DisconnectReason.loggedOut) {
        console.log("Logout! hapus session")
        process.exit()
      } else {
        startBot()
      }

    } else if (connection === "open") {
      console.log("✅ Bot connect!")
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    handleMessage(sock, msg)
  })
}

startBot()
