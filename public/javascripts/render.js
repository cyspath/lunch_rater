function render(data) {
  $('#content').html("");
  ["Monday", "Tuesday", "Wednesday", "Thursday"].forEach(function (day) {
    $('#content').append("<h4>" + data[day].header + "</h4>")
    for (var dishId in data[day].dishes) {
      $('#content').append(
        "<div data-day='" + data[day].dishes[dishId].day + "' data-id='" + dishId + "'><span class='rating-score'>" +
        (data[day].dishes[dishId].upvotes - data[day].dishes[dishId].downvotes) + "</span><span class='menu-item'> " +
        data[day].dishes[dishId].name +
        " </span><button onClick='voteup()' class='btn btn-primary'>Like</button><button onClick='votedown()' class='btn btn-info'>Hate</button></div>")
    }
  })
}
