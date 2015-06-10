/* global require, module */

'use strict'

let cssnext = broc('cssnext-single')
let funnel  = broc('funnel')
let merge   = broc('merge-trees')

let ionicons = funnel('node_modules/ionicons-pre/fonts', {
  destDir: 'fonts'
})

let assets = merge([ funnel('assets'), ionicons ])

let css = cssnext('css', 'adcssy.css', 'css/adcssy.css', {
  compress:  false,
  sourcemap: true,
  url:       false
})

let html = funnel('test', {
  destDir: '/',
  files: [ 'index.html' ]
})

module.exports = merge([ css, assets, html ])

function broc(m) {
  return require('broccoli-' + m)
}
