require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const CompressionPlugin = require('compression-webpack-plugin')

const plugins = [
  new WebpackBuildNotifierPlugin({
    title: 'Untappd Menu Starter',
    suppressSuccess: true
  }),

  new CleanWebpackPlugin(['build'], {
    root: process.cwd(),
    verbose: true,
    dry: false,
    exclude: ['bundle.js', 'index.html']
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_KEY: JSON.stringify(process.env.API_KEY),
      EMAIL: JSON.stringify(process.env.EMAIL)
    }
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },

      mangle: {
        screw_ie8: true
      },

      output: {
        comments: false,
        screw_ie8: true
      }
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = {
  entry: [
    './app/matches',
    './app/entry.js'
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: process.env.NODE_ENV === 'production' ? 'menu.[hash].min.js' : 'bundle.js'
  },

  plugins,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [__dirname + '/app/helpers']
        }
      }
    ]
  }
}
