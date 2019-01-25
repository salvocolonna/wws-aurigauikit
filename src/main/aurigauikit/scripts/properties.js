const PropertiesReader = require("properties-reader")
const objectPath = require("object-path")
const fs = require("fs")
const path = require("path")

const SOURCE = path.resolve(process.cwd(), "./src/main/resources")
const ENV = process.env.BUILD_ENV
const DEV = "dev"
const PROD = "prod"

let properties = null
const read = source => properties || PropertiesReader(source).getAllProperties()

module.exports = () => {
  const dev = ENV === DEV
  let source = `${SOURCE}/application${dev ? "" : `-${ENV}`}.properties`
  if (!fs.existsSync(source)) source = `${SOURCE}/application.properties`
  const properties = read(source)
  const expanded = {}
  const expand = property => objectPath.set(expanded, property, properties[property])
  Object.keys(properties).forEach(expand)
  return expanded
}
