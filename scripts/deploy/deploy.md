# Deploy.js

Run `yarn deploy` in order to run the script. Use either the flag `--publish` or `--update`.

- Use `--publish` in order to update the AurigaUIKit. Run it when the update of the version in the AurigaUIKit (in package.json) has been merged into master.
- Use `--update` in order to update your local project. Before to run it, add a configuration file `deploy-config.js` with a variable as follows: `const wwsDir = wwsPath`, where `wwsPath` is the path of the project which you want to update after the new version of the AurigaUIKit is deployed. `wwsDir` has to be to be exported as follows: `module.exports = wwsDir`.
