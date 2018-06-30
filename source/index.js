const format = (item) => {
  if (item.lang) {
    return `<meta property="${item.property}" lang="${item.lang}" content="${item.content}" />`
  }
  if (item.url) {
    item.content = `<%= require(${item.content}) %>`
  }
  return `<meta property="${item.property}" content="${item.content}" />`
}

class OpengraphHtmlWebpackPlugin {
  constructor (opts) {
    this.options = opts
    this.onPluginData = this.onPluginData.bind(this)
  }

  onPluginData (htmlPluginData, callback) {
    const filesToInclude = this.options.map(format).join('\n')
    htmlPluginData.html = htmlPluginData.html.replace('</head>', filesToInclude + '\n</head>')
    callback && callback(null, htmlPluginData)
  }

  apply (compiler) {
    // Hook into the html-webpack-plugin processing
    if (compiler.hooks) {
      // Webpack 4+ Plugin Systema
      compiler.hooks.compilation.tap('OpengraphHtmlWebpackPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing
          .tapAsync('OpengraphHtmlWebpackPluginOGTags', this.onPluginData)

      })
    } else {
      // Webpack 1-3 Plugin System
      compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-before-html-processing', this.onPluginData)
      })
    }
  }
}
module.exports = OpengraphHtmlWebpackPlugin
