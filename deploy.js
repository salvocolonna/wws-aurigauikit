/*
  REQUIREMENTS
  - Any change in the projects (related to the script) needs to be either committed or discarded.
  - A PATH needs to be set. It has to be the path of the project where you want to update the version of the AurigaUIKit.

  WHEN TO RUN THE SCRIPT
  - Run the script when the update of the version in the AurigaUIKit (in package.json) has been merged into master.

  HOW TO RUN THE THE SCRIPT
  - Run node deploy.js in order to run the script.

*/

const { execSync } = require('child_process')
import { wwsDir } from './deploy-config'

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
