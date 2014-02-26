$(document).ready(function() {
  $('body').on('mouseenter', '.toggle', function() {
    $('.menu').animate({left: '0%', opacity: '1'}, 1000);
  })

  $('body').on('mouseleave', '.menu', function() {
    $('.menu').animate({left: '-31%', opacity: '0'}, 1000);
  })

  $('body').on('click', '.close', function() {
    $('.menu').animate({left: '-31%', opacity: '0'}, 1000);
  })
})
