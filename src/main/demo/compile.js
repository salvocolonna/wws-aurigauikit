const fs = require("fs")
const path = require("path")
const watcher = require("chokidar")
const CLIEngine = require("eslint").CLIEngine
const eslint = new CLIEngine({ fix: true })

const COMPONENTS = path.join(__dirname, "./components")
const DESTINATION = path.join(__dirname, "./App/components.js")
const WATCH = process.argv[2] === "--watch" || process.argv[2] === "-w"

const parse = () => {
  const parts = {}
  fs.readdirSync(COMPONENTS).forEach(component => {
    const COMPONENT = COMPONENTS + "/" + component
    parts[component] = []
    fs.readdirSync(COMPONENT).forEach(part => {
      if (part.endsWith(".jsx")) {
        const name = part.split(".jsx")[0]
        const code = fs.readFileSync(COMPONENT + "/" + part).toString()
        parts[component].push(name)
        parts[component][name] = { code }
      }
    })
  })
  const merge = displayName => ({ displayName, parts: parts[displayName] })
  return fs.readdirSync(COMPONENTS).map(merge)
}

const renderMetadata = ({ displayName }) => {
  const metaPath = displayName + "/meta.json"
  return (
    fs.existsSync(COMPONENTS + "/" + metaPath) &&
    `import ${displayName}Metadata from '../components/${metaPath}'`
  )
}

const render = ({ displayName, parts }) => {
  const metaPath = COMPONENTS + "/" + displayName + "/meta.json"
  const meta = !fs.existsSync(metaPath) ? "{}" : `${displayName}Metadata`
  const part = part => {
    const path = `../components/${displayName}/${part}`
    return `"${part}": {
      "component": lazy(() => import('${path}')),
      "code": () => import('!raw-loader!${path}')
    }`
  }
  return `"${displayName}": { "metadata": ${meta}, ${parts.map(part)} }`
}

const compile = () => {
  const data = parse()
  const metadata = data
    .map(renderMetadata)
    .filter(Boolean)
    .join("\n")
  const code = `
    import { lazy } from 'react' 
    ${metadata}
    export default { ${data.map(render)} }
  `
  fs.writeFileSync(DESTINATION, code)
  const [{ output: linted }] = eslint.executeOnFiles([DESTINATION]).results
  fs.writeFileSync(DESTINATION, linted)
}

if (WATCH) {
  watcher
    .watch(COMPONENTS, { persistent: true, ignoreInitial: true })
    .on("add", compile)
    .on("unlink", compile)
}

compile()
