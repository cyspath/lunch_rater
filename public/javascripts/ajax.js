
$(document).ready(function () {

  $('.fetch-menu').click(function () {
    $.ajax({
      type: 'GET',
      url: '/fetchMenu',
      data: {
      },
      error: function() {
        console.log('error');
      },
      success: function(data) {
        console.log(data);
        render(data.data)
      },
    });
  })

})

function updateView() {
  $.ajax({
    type: 'get',
    url: '/update',
    error: function() {
      console.log('error');
    },
    success: function(data) {
      console.log(data);
      render(data);
    },
  });
}


function voteup() {
  $parent = $(event.target).parent();
  var storageKey = "lunchRater:" + $parent.attr('data-id');
  if (localStorage.getItem(storageKey) == "1") { return }

  var increment = 1;
  if (localStorage.getItem(storageKey) == "-1") {
    increment = 2;
  }

  $.ajax({
    type: 'POST',
    url: '/voteup',
    data: { day: $parent.attr('data-day'), id: $parent.attr('data-id'), increment: increment },
    error: function() {
      console.log('error');
    },
    success: function(data) {
      localStorage.setItem(storageKey, "1")
      render(data);
    },
  });
}

function votedown() {
  $parent = $(event.target).parent();
  var storageKey = "lunchRater:" + $parent.attr('data-id');
  if (localStorage.getItem(storageKey) == "-1") { return }

  var increment = 1;
  if (localStorage.getItem(storageKey) == "1") {
    increment = 2;
  }

  $.ajax({
    type: 'POST',
    url: '/votedown',
    data: { day: $parent.attr('data-day'), id: $parent.attr('data-id'), increment: increment },
    error: function() {
      console.log('error');
    },
    success: function(data) {
      localStorage.setItem(storageKey, "-1")
      render(data);
    },
  });
}
