import webpack from "webpack"
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import getProperties from "../properties"
import getAlias from "../alias"
import babelrc from "../babelrc"
import Progress from "../progress"

const properties = getProperties()
const alias = getAlias()

const definitions = { "process.env.APP_CONFIG": JSON.stringify(properties) }

const modules = [
  path.resolve(process.cwd(), "./node_modules/aurigauikit/node_modules"),
  path.resolve(process.cwd(), "./node_modules")
]

export default {
  context: process.cwd(),
  plugins: [
    new Progress(),
    new webpack.DefinePlugin(definitions),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      title: properties.server.name,
      template: path.resolve(__dirname, "./index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            ...babelrc,
            babelrc: false,
            cacheDirectory: false,
            metadataSubscribers: ["metadataMissingTranslations"]
          }
        },
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        options: {
          fix: true,
          failOnWarning: false,
          failOnError: true,
          quiet: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|pdf)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules,
    alias
  }
}
