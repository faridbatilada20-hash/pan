const fs = require("fs")
const path = "./database/users.json"

if (!fs.existsSync("./database")) {
  fs.mkdirSync("./database")
}

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({}))
}

function loadDB() {
  return JSON.parse(fs.readFileSync(path))
}

function saveDB(db) {
  fs.writeFileSync(path, JSON.stringify(db, null, 2))
}

function addUser(id) {
  let db = loadDB()
  if (!db[id]) {
    db[id] = {
      uang: 0,
      lastClaim: 0
    }
    saveDB(db)
  }
}

module.exports = { loadDB, saveDB, addUser }
