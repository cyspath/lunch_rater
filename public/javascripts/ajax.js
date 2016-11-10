
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


})
