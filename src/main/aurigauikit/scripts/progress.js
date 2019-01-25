import fs from "fs"
import path from "path"
import chalk from "chalk"
import readline from "readline"

const PLUGIN = "Progress"

export default class Progress {
  moduleFound = module => {
    const resource =
      module.resource.split("wws-aurigauikit").length > 1
        ? module.resource
            .split("\\")
            .join("/")
            .split("src/main/")[1]
        : module.resource
            .split("\\")
            .join("/")
            .split("webapp/WEB-INF/")[1]
    //process.stdout.clearLine()
    readline.clearLine(process.stdout, 0)
    process.stdout.write("\r" + chalk.green.bold("Building ") + chalk.blue.bold(resource))
  }

  apply = compiler => {
    compiler.hooks.compilation.tap(PLUGIN, compilation => {
      compilation.hooks.normalModuleLoader.tap(PLUGIN, (context, module) => {
        if (module.context.split("node_modules").length === 1) this.moduleFound(module)
      })
    })

    compiler.hooks.emit.tap(PLUGIN, () => console.log("\n"))
  }
}
