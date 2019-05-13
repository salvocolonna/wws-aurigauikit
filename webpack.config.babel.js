import webpack from 'webpack'
import path from 'path'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const module = {
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
        { loader: MiniCssExtractPlugin.loader },
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
            modifyVars: {
              '@primary-color': '#2984C5',
              '@info-color': '#2984C5',
              '@link-color': '#2984C5',
              '@success-color': '#65C25A',
              '@error-color': '#DC402B',
              '@warning-color': '#E98036',
              '@border-color-base': '#AAAAAA',
              '@border-color-split': '#CCCCCC',
              '@alert-info-bg-color': '#F1F7FC',
              '@alert-info-icon-color': '#20689B',
              '@alert-info-border-color': '#C7E1F3',
              '@alert-error-bg-color': '#FDF1F0',
              '@alert-error-icon-color': '#AD2E1D',
              '@alert-error-border-color': '#AD2E1D',
              '@alert-warning-bg-color': '#FDF4EE',
              '@alert-warning-icon-color': '#CC6116',
              '@alert-warning-border-color': '#CC6116',
              '@alert-success-bg-color': '#F0F9EF',
              '@alert-success-icon-color': '#47A33C',
              '@alert-success-border-color': '#47A33C',
              '@normal-color': '#FAFAFA',
              '@text-color': '#3c434a',
              '@btn-default-bg': '#FFFFFF',
              '@btn-default-color': '#2984C5',
              '@btn-default-border': '#2984C5',
              '@font-family': 'Open Sans,sans-serif',
              '@font-size-base': '13px',
              '@input-height-base': '37px',
              '@btn-padding-base': '0 1.5em',
              '@btn-height-base': '34px',
              '@line-height-base': 1.4,
              '@btn-font-weight': 700,
            },
            javascriptEnabled: true,
          },
        },
      ],
    },
  ],
}

const libRules = [
  {
    test: /\.(eot|svg|ttf|woff|woff2|jpg|pdf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath: './',
        },
      },
    ],
  },
  {
    test: /\.(png)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
        },
      },
    ],
  },
]

const demoRules = [
  {
    test: /\.(eot|svg|ttf|woff|woff2|jpg|png|pdf)$/,
    use: ['file-loader'],
  },
]

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
}

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new MiniCssExtractPlugin({ filename: 'aurigauikit.bundle.css' }),
  /*new BundleAnalyzerPlugin({ analyzerMode: "static" })*/
]

const lib = {
  mode: 'production',
  entry: './src/main/aurigauikit',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'aurigauikit.bundle.js',
    library: 'AurigaUIKit',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  plugins,
  module: { ...module, rules: [...module.rules, ...libRules] },
  resolve,
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
  devtool: 'source-map',
}

const libDev = {
  ...lib,
  mode: 'development',
  devtool: 'inline-source-map',
}

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
  module: { ...module, rules: [...module.rules, ...demoRules] },
  resolve,
  devtool: 'inline-source-map',
}

export default env => (env === 'lib' ? lib : env === 'libDev' ? libDev : demo)
