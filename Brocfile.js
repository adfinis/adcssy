/* global require, module */

'use strict'

let merge      = require('lodash.merge')
let cssnext    = broc('cssnext-single')
let funnel     = broc('funnel')
let mergeTrees = broc('merge-trees')
let live       = broc('inject-livereload')
let env        = broc('env').getEnv()

let cssOptions = {
  url:       false,
  browsers:  '> 1%, last 2 versions, Firefox ESR',
  features:  { rem: false },
  plugins:   [ plugin('responsive-type') ]
}

let icons = funnel('node_modules/font-awesome/fonts', {
  destDir: 'fonts'
})

let assets = mergeTrees([ funnel('assets'), icons ])

let css = cssnext('css', 'adcssy.css', 'css/adcssy.css', merge({
  map:      { inline: false, annotation: 'adcssy.css.map' },
  compress: false
}, cssOptions))

let minified = cssnext('css', 'adcssy.css', 'css/adcssy.min.css', merge({
  map:      { inline: false, annotation: 'adcssy.min.css.map' },
  compress: true
}, cssOptions))

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
