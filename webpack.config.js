const path = require('path')
const webpack = require('webpack')
const env = require('./env')

Object.assign(process.env, env)

module.exports = {
  devServer: {
    inline: true
  },

  entry: {
    app: ['./app/entry.js']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'API_KEY'
    ])
  ],

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
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: 'utfb--[local]--[hash:base64:5]'
        }
      },
      {
        test: /\.hbs$/, loader: 'handlebars-loader'
      }
    ]
  }
}
