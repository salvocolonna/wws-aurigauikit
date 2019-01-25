import path from "path"

const kitPackage = require(path.resolve(process.cwd(), "./node_modules/aurigauikit/package.json"))
const appPackage = require(path.resolve(process.cwd(), "./package.json"))

export default () => {
  const kitKeys = Object.keys(kitPackage.dependencies)
  const toOverride = Object.keys(appPackage.dependencies).filter(key => {
    const found = kitKeys.find(kitKey => kitKey === key)
    return found
  })
  return toOverride.reduce(
    (alias, key) => ({
      ...alias,
      [key]: path.resolve(process.cwd(), `./node_modules/${key}`)
    }),
    {}
  )
}
