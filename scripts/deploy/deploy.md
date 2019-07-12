# Requirements

- Any change in the projects needs to be either committed or discarded before running the script.
- A configuration file (name it deploy-config.js) with a variable which is an object as follows: `const wwsDir = wwsPath`. Where `wwsPath` is the path of the project which you want to update after the new version of the AurigaUIKit is deployed. `wwsDir` has to be to be exported as follows: `module.exports = wwsDir`

# When to run the script

- Run the script when the update of the version in the AurigaUIKit (in package.json) has been merged into master.

# How to run the script

- Run node deploy.js in order to run the script. Use either the flag `--publish` or `--update`. Use publish in order to update the AurigaUIKit. Use update in order to update your local project.
