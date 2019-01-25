import path from "path"
export default {
  presets: ["env", "stage-2", "react", "flow"],
  plugins: [
    "react-intl",
    "transform-decorators-legacy",
    "transform-class-properties",
    [
      "module-resolver",
      {
        root: [
          path.resolve(process.cwd(), "./src/main/webapp/WEB-INF/app"),
          path.resolve(process.cwd(), "./node_modules/aurigauikit/src/main")
        ]
      }
    ],
    "add-react-displayname"
  ],
  env: {
    production: {
      presets: ["minify"]
    }
  }
}
