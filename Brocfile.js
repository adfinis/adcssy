/* global require, module */

'use strict'

let cssnext = broc('cssnext-single')
let funnel  = broc('funnel')
let merge   = broc('merge-trees')
let live    = broc('inject-livereload')
let env     = broc('env').getEnv()

let ionicons = funnel('node_modules/ionicons-pre/fonts', {
  destDir: 'fonts'
})

let assets = merge([ funnel('assets'), ionicons ])

let css = cssnext('css', 'adcssy.css', 'css/adcssy.css', {
  compress:  env === 'production',
  sourcemap: env !== 'production',
  url:       false,
  browsers:  '> 1%, last 2 versions, Firefox ESR'
})

let html = live('test', {
  destDir: '/',
  files: [ 'index.html' ]
})

module.exports = merge([ css, assets, html ])

function broc(m) {
  return require('broccoli-' + m)
}
