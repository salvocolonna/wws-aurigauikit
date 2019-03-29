const fs = require("fs")
const files = ["package.json"]

const copy = file => fs.createReadStream(`./${file}`).pipe(fs.createWriteStream(`./dist/${file}`))

files.forEach(copy)
