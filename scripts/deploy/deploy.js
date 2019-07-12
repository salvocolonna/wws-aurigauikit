const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const CONFIG_PATH = path.join(__dirname, './deploy-config.js')
const option = process.argv.slice(2)[0]
const aurigaDist = { cwd: path.join(__dirname, `../../dist`) }

const logExec = (...arg) => {
  console.log(...arg)
  return execSync(...arg)
}

if (option === '--publish') {
  publish()
} else if (option === '--update') {
  update()
} else {
  console.warn('Add a flag:')
  console.warn('  --publish in order to publish a new AurigaUIKit version')
  console.warn('  --update in order to update your local project')
  console.warn('More info in deploy.md')

  process.exit()
}

function publish() {
  logExec('git checkout master')
  logExec('git pull')
  try {
    logExec('yarn unlink')
  } catch (e) {
    console.log(e.message)
  }
  logExec('yarn build')
  logExec('npm publish', aurigaDist)
  logExec('yarn link', aurigaDist)
}

function update() {
  try {
    fs.readFileSync(CONFIG_PATH)
  } catch (e) {
    throw 'This error probably occured due to a missing configuration file. Read documentation in deploy.md for more details. More info below: \n' +
    e.message
  }
  const wwsDir = require(CONFIG_PATH)
  logExec('yarn add aurigauikit', wwsDir)
  logExec('yarn link aurigauikit', wwsDir)
  logExec('git status', wwsDir)
}
