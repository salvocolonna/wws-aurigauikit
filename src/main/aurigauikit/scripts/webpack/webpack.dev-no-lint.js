import dev from "./webpack.dev"

const eslint = dev.module.rules.find(rule => rule.loader === "eslint-loader")
dev.module.rules.splice(dev.module.rules.indexOf(eslint), 1)

export default dev
