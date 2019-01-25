const DEV = "dev"
const PROD = "prod"

export default (ENV = DEV) => {
  process.env.BUILD_ENV = ENV
  try {
    return require(`./webpack.${ENV}.js`)
  } catch (e) {
    if (ENV.startsWith("prod")) return require(`./webpack.${PROD}.js`)
    else return require(`./webpack.${DEV}.js`)
  }
}
