(function ($) {

  //手机端最大安全尺寸, 最大尺寸设置100px
  var maxWidth = 640;

  //获取屏幕的宽度
  var screenWidth = screen.width;

  var size = screenWidth / maxWidth * 100;

  var id = 'rem' + new Date().getTime();
  var style = $('<style id="' + id + '">html{font-size: ' + size + 'px;}</style>');

  $('head').append(style);

})(jQuery)