/* global require, module */

'use strict'

const postcss = require('broccoli-postcss-single')
const Funnel = require('broccoli-funnel')
const BroccoliMergeTrees = require('broccoli-merge-trees')
const BrowserSync = require('broccoli-browser-sync')
const env = require('broccoli-env').getEnv()

let plugins = [
  { module: require('postcss-import') },
  {
    module: require('postcss-cssnext'),
    options: {
      browsers: '> 2%, last 2 versions, Firefox ESR',
      features: { rem: false }
    }
  },
  { module: require('postcss-responsive-type') }
]

let icons = new Funnel('node_modules/font-awesome/fonts', {
  destDir: 'fonts'
})

let assets = new BroccoliMergeTrees(['assets', icons])

let css = postcss(['css'], 'adcssy.css', 'css/adcssy.css', {
  plugins,
  map: {
    inline: false,
    annotation: 'adcssy.css.map'
  }
})

let minified = postcss(['css'], 'adcssy.css', 'css/adcssy.min.css', {
  plugins: [...plugins, { module: require('cssnano') }],
  map: {
    inline: false,
    annotation: 'adcssy.min.css.map'
  }
})

let trees = [css, minified, assets]

if (env === 'development') {
  let html = new Funnel('test')

  trees.push(html)

  module.exports = new BroccoliMergeTrees([...trees, new BrowserSync(trees)])
} else {
  module.exports = new BroccoliMergeTrees(trees)
}
