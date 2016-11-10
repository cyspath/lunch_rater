
$(document).ready(function () {

  $('.rateup').click(function () {
    console.log('clicked');
    $.ajax({
      type: 'POST',
      url: '/rateup',
      data: {
      },
      error: function() {
        console.log('error');
      },
      success: function(data) {
        console.log(data);
      },
    });

  })


  $('.fetch').click(function () {
    console.log('clicked');
    $.ajax({
      type: 'GET',
      url: '/fetch',
      data: {
      },
      error: function() {
        console.log('error');
      },
      success: function(data) {
        console.log(data);
      },
    });

  })


})
