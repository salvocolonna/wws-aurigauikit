import webpack from "webpack"
import common from "./webpack.common"
import getProperties from "../properties"
import MissingTranslations from "../missing-translations"
import path from "path"

const properties = getProperties()

const entry = path.resolve(process.cwd(), "./src/main/webapp/WEB-INF/app")

const devServer = {
  port: properties.server.port,
  contentBase: ".",
  historyApiFallback: {
    rewrites: [
      {
        from: /.*\.(html|jsp)/,
        to: "/index.html"
      }
    ]
  }
}

export default {
  ...common,
  mode: "development",
  entry,
  output: {
    filename: "app.bundle.js",
    publicPath: "/",
    sourceMapFilename: "app.bundle.js.map"
  },
  plugins: [
    ...common.plugins,
    new webpack.NamedModulesPlugin(),
    new MissingTranslations({
      path: entry + "/i18n/translations",
      languages: ["en", "fr", "it", "sq", "es", "ru"],
      defaultLanguage: "en",
      filter: (resource, id) => !resource.includes("aurigauikit") && !id.startsWith("xfs")
    })
  ],
  devServer,
  devtool: "inline-source-map"
}
