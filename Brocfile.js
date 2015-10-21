/* global require, module */

'use strict'

let cssnano    = require('cssnano')
let postcss    = broc('postcss')
let funnel     = broc('funnel')
let mergeTrees = broc('merge-trees')
let live       = broc('inject-livereload')
let env        = broc('env').getEnv()

let plugins = [
  {
    module: plugin('import')
  },
  {
    module: plugin('cssnext'),
    options: {
      browsers: '> 2%, last 2 versions, Firefox 38',
      features: { rem: false }
    }
  },
  {
    module: plugin('responsive-type')
  }
]

let icons = funnel('node_modules/font-awesome/fonts', {
  destDir: 'fonts'
})

let assets = mergeTrees([ funnel('assets'), icons ])

let css = postcss(['css'], 'adcssy.css', 'css/adcssy.css', plugins, {
  inline:     false,
  annotation: 'adcssy.css.map'
})

plugins = plugins.concat([{ module: cssnano }])

let minified = postcss(['css'], 'adcssy.css', 'css/adcssy.min.css', plugins, {
  inline:     false,
  annotation: 'adcssy.min.css.map'
})

let trees = [ css, minified, assets ]

if (env === 'development') {
  let html = live('test', { destDir: '/' })

  trees.push(html)
}

module.exports = mergeTrees(trees)

function broc(m) {
  return require('broccoli-' + m)
}

function plugin(p) {
  return require('postcss-' + p)
}
