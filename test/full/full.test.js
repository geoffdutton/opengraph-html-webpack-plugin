const path = require('path')
const fs = require('fs')
const chai = require('chai')
chai.config.showDiff = true
const { expect } = require('chai')
const webpack = require('webpack')

// returns a Compiler instance
const compile = () => new Promise((resolve, reject) => {
  console.log('building...')
  webpack(require('../../webpack.config'), function (err, stats) {
    if (err) {
      console.log('error')
      return reject(err)
    }
    console.log('built')
    resolve(stats)
  })
})

const readDistIndex = () => {
  const distIndex = path.resolve(__dirname, '..', '..', 'dist', 'index.html')
  return fs.readFileSync(distIndex, 'utf8')
}

describe('opengraph-html-webpack-plugin end-to-end', function () {
  this.timeout(10 * 1000)
  it('should output above the head tag', (done) => {
    compile().then(() => {
      expect(readDistIndex()).to.contain(`<meta property="og:description" lang="en_UK" content="My website is really awesome" />\n</head>`)
      done()
    })
      .catch(err => {
        console.log('Actual output:\n\n' + err.actual)
        console.log('\n')
        done(err)
      })
  })
})
