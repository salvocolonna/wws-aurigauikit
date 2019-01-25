import webpack from "webpack"
import path from "path"
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      use: ["babel-loader"],
      exclude: /node_modules/
    },
    {
      test: /\.(css|less)$/,
      use: [
        "style-loader",
        { loader: MiniCssExtractPlugin.loader },
        {
          loader: "css-loader",
          options: {
            minimize: true,
            camelCase: "dashes",
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        },
        {
          loader: "less-loader",
          options: {
            minimize: true
          }
        }
      ]
    }
  ]
}

const libRules = [
  {
    test: /\.(eot|svg|ttf|woff|woff2|jpg|pdf)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          publicPath: "./"
        }
      }
    ]
  },
  {
    test: /\.(png)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          publicPath: "./dist/"
        }
      }
    ]
  }
]

const demoRules = [
  {
    test: /\.(eot|svg|ttf|woff|woff2|jpg|png|pdf)$/,
    use: ["file-loader"]
  }
]

const resolve = {
  extensions: [".js", ".jsx"]
}

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new MiniCssExtractPlugin({ filename: "aurigauikit.bundle.css" })
  /*new BundleAnalyzerPlugin({ analyzerMode: "static" })*/
]

const lib = {
  mode: "production",
  entry: "./src/main/aurigauikit",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "aurigauikit.bundle.js",
    library: "AurigaUIKit",
    libraryTarget: "umd",
    publicPath: "/"
  },
  plugins,
  module: { ...module, rules: [...module.rules, ...libRules] },
  resolve,
  externals: { react: "React", "react-dom": "ReactDOM" },
  devtool: "source-map"
}

const libDev = {
  ...lib,
  mode: "development",
  devtool: "inline-source-map"
}

const demo = {
  mode: "development",
  entry: "./src/main/demo/App",
  output: {
    filename: "aurigauikit-demo.bundle.js",
    publicPath: "/",
    sourceMapFilename: "aurigauikit-demo.bundle.js.map"
  },
  devServer: {
    port: 3000,
    inline: true,
    contentBase: ".",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*\.html/,
          to: "/index.html"
        }
      ]
    }
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  module: { ...module, rules: [...module.rules, ...demoRules] },
  resolve,
  devtool: "inline-source-map"
}

export default env => (env === "lib" ? lib : env === "libDev" ? libDev : demo)
