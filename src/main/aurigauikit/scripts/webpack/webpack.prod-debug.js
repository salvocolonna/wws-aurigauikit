import prod from "./webpack.prod"

export default {
  ...prod,
  output: {
    ...prod.output,
    sourceMapFilename: "[name].bundle.js.map"
  },
  devtool: "inline-source-map"
}
