/*
  REQUIREMENTS
  - Any change in the projects needs to be either committed or discarded before running the script.
  - A configuration file (name it deploy-config.js) with a variable which is an object as follows:   
      const wwsDir = { cwd: wwsPath }
    where wwsPath is the path of the project which you want to update after the new version of the aurigauikit is deployed.
    wwsDir needs to be exported as follows:
      module.exports = wwsDir

  WHEN TO RUN THE SCRIPT
  - Run the script when the update of the version in the AurigaUIKit (in package.json) has been merged into master.

  HOW TO RUN THE THE SCRIPT
  - Run node deploy.js in order to run the script.

*/

const wwsDir = require('./deploy-config')
const { execSync } = require('child_process')
const aurigaDist = { cwd: `./dist` }

const logExec = (...arg) => {
  console.log(...arg)
  return execSync(...arg)
}

logExec('git checkout master')
logExec('git pull')
try {
  logExec('yarn unlink aurigauikit', wwsDir)
} catch (e) {
  logExec('yarn link', aurigaDist)
  logExec('yarn link aurigauikit', wwsDir)
}
logExec('yarn unlink')
logExec('yarn build')
logExec('npm publish', aurigaDist)
logExec('yarn link', aurigaDist)
logExec('git checkout master', wwsDir)
logExec('git pull', wwsDir)
logExec('yarn add aurigauikit', wwsDir)
logExec('yarn link aurigauikit', wwsDir)
logExec('git status', wwsDir)

console.log('There should be package.json and package.lock ready to be staged')
