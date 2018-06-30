const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpengraphHtmlWebpackPlugin = require('./source')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'test', 'full', 'entry.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'entry_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new OpengraphHtmlWebpackPlugin([
      { property: 'og:title', content: 'My website title' },
      { property: 'og:description', lang: 'en_UK', content: 'My website is really awesome' }
    ])
  ]
}
