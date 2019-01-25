import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import dev from "./webpack.dev"

export default {
  ...dev,
  plugins: [...dev.plugins, new BundleAnalyzerPlugin({ analyzerMode: "static" })]
}
