console.log('test');

var $win = $(window),
    $body = $('body');

var getViewMode = function() {
  var w = $win.width(),
      h = $win.height();

  return (w > h) ? 'landscape' : 'portrait';
};

$win.on('resize', function(e) {
  $body.removeClass().addClass(getViewMode());
});
