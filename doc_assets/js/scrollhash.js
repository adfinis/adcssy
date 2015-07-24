// http://stackoverflow.com/questions/5315659/jquery-change-hash-while-scolling-down-page/23102243#23102243
(function(window) {
  var $            = window.jQuery
  var setTimeout   = window.setTimeout
  var context      = '.page-content'
  var $context     = $(context)
  var selector     = '[id].styleguide'
  var $subnav      = $('main').find('.nav-side--sub')
  var $subnavLinks = $subnav.find('a')
  var floor        = Math.floor

  var $sections = $(selector).map(function(i, el) {
    return $(el).nextUntil('h1').andSelf().wrapAll('<section class="adsy-styleguide">')
  })

  // Find all  top,bottom and Hash of each sections,
  // Do this only if the section height remain the same always
  // Move this into the step() if your section height does change.
  // e.g. browser resize
  var section = $.map($('.adsy-styleguide'), function(e) {
    var $e = $(e)
    var pos = $e.position()
    return {
      top: floor(pos.top),
      bottom: floor(pos.top + $e.height()),
      hash: $e.find('h1').attr('id')
    }
  })

  //Checking scroll
  var top = null
  var changed = false
  var currentHash = null

  $context.scroll(function() {
    var newTop = $context.scrollTop()

    changed = newTop != top
    if (changed) {
      top = newTop
    }
  })

  // You wouldn't want to keep checking the scroll state as
  // it affects the browser performance when it's accessing
  // DOM and reduce your FPS (Frame per Seconds) for scrolling
  function step() {
    if (!changed) {
      // Top did not change
      return setTimeout(step, 200)
    }
    var count = section.length
    var p

    while (p = section[--count]) {
      if (p.top >= top || p.bottom <= top) {
        continue
      }
      if (currentHash === p.hash) {
        break
      }
      var scrollTop = $context.scrollTop()
      window.location.hash = currentHash = p.hash
      // prevent browser to scroll
      $context.scrollTop(scrollTop)

      $subnavLinks.removeClass('active')
      $subnavLinks.filter('[href=#' + p.hash +']').addClass('active')
    }
    setTimeout(step, 200)
  }
  setTimeout(step, 200)
})(this)
