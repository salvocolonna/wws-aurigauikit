import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import prod from "./webpack.prod"

export default {
  ...prod,
  plugins: [...prod.plugins, new BundleAnalyzerPlugin({ analyzerMode: "static" })]
}
