import webpack from 'webpack'
const antOverrides = require('aurigauikit/style/ant-override')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
}

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

const demo = {
  mode: 'development',
  entry: './src/main/demo/App',
  output: {
    filename: 'aurigauikit-demo.bundle.js',
    publicPath: '/',
    sourceMapFilename: 'aurigauikit-demo.bundle.js.map',
  },
  devServer: {
    port: 3100,
    inline: true,
    contentBase: '.',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*\.html/,
          to: '/index.html',
        },
      ],
    },
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    ...{
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(css|less)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                camelCase: 'dashes',
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'less-loader',
              options: {
                minimize: true,
                modifyVars: antOverrides,
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|jpg|png|pdf)$/,
          use: ['file-loader'],
        },
      ],
    }
  },
  resolve,
  devtool: 'inline-source-map',
}

export default demo
