/* global require, module */

'use strict'

let cssnext = broc('cssnext')
let funnel  = broc('funnel')
let merge   = broc('merge-trees')

let ionicons = funnel('node_modules/ionicons-pre/fonts', {
  destDir: 'fonts'
})

let fonts = funnel('assets/fonts', {
  destDir: 'fonts'
})

let css = funnel('css', {
  destDir: 'css',
  files: [ 'adcssy.css' ]
})
css = cssnext(css, {
  compress:  false,
  sourcemap: true,
  from:      'css/adcssy.css',
  url:       false
})

let html = funnel('test', {
  destDir: '/',
  files: [ 'index.html' ]
})

module.exports = merge([ css, ionicons, fonts, html ])

function broc(m) {
  return require('broccoli-' + m)
}
