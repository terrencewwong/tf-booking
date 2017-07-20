const StaticSiteGenerator = require('static-site-generator-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const ejs = require('ejs')
const fs = require('fs')
const template = ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))

module.exports = {
  entry: __dirname + '/src/',
  output: {
    path: __dirname + '/dist/',
    filename: 'tf-booking.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new StaticSiteGenerator('main', ['/'], { template })
//    new BrowserSyncPlugin({
//      host: 'localhost',
//      port: 4444,
//      server: { baseDir: ['dist'] }
//    })
  ]
}
