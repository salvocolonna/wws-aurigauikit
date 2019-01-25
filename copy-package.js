const fs = require("fs")
const pkg = require("./package.json")

pkg.main = "index.js"
pkg.peerDependencies = {
  react: pkg.dependencies["react"],
  "react-dom": pkg.dependencies["react-dom"]
}

delete pkg.dependencies.react
delete pkg.dependencies["react-dom"]
delete pkg.scripts
delete pkg.devDependencies

fs.writeFileSync("dist/package.json", JSON.stringify(pkg, 0, 2))
