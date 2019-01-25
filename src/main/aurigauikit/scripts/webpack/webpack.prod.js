import path from "path"
import common from "./webpack.common"
import readProperties from "../properties"

const properties = readProperties()

const publicPath = `${properties.server["context-path"]}/webjars/`

export default {
  ...common,
  mode: "production",
  entry: path.resolve(process.cwd(), "./src/main/webapp/WEB-INF/app/index.prod"),
  output: {
    ...common.output,
    filename: "app.bundle.js",
    publicPath,
    path: path.resolve(process.cwd(), "./target/classes/META-INF/resources/webjars")
  },
  plugins: [...common.plugins]
}
