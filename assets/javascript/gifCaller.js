let shows = ["Bobs Burgers", "Archer", "The Simpsons",
            "Family Guy", "American Dad", "Futurama" ,
            "South Park" , "Rick and Morty" , "The Boondocks",
            "Robot Chicken", "Adventure Time" , "Daria"];

function renderButtons() {
  $("#shows-btns").empty();
  for (var index = 0; index < shows.length; index++) {
    var btn = $("<button>");
    btn.addClass("show btn btn-outline-dark");
    btn.attr("show-name", shows[index]);
    btn.text(shows[index]);
    $("#shows-btns").append(btn);
  }
}

renderButtons();

$(document).on("click", "button" , function () {
    let show = $(this).attr("show-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=12";

$.ajax({
    url: queryURL,
    method: "GET"
})
.done(function (response) {
    $("#gifs-here").empty();
    let results = response.data;
    for (var index = 0; index < results.length; index++) {
        let gifDiv = $("<div class='item'>");
        let rating = results[index].rating;
        let paraRating = $("<p>").text("Rating: " + rating);
        let showImage = $("<img>");

showImage.attr({"src": results[index].images.fixed_height_still.url,
                "data-still": results[index].images.fixed_height_still.url,
                "data-animate": results[index].images.fixed_height.url
              });
gifDiv.prepend(paraRating);
gifDiv.prepend(showImage);
$("#gifs-here").prepend(gifDiv);

showImage.on("click", function () {
    let state = $(this).attr('data-state');

    if (state === 'still') {
        let newSrc = $(this).attr('data-animate');
        $(this).attr('src', newSrc);
        $(this).attr('data-state', 'animate');
    }
    else {
        let newSrc = $(this).attr('data-still');
        $(this).attr('src', newSrc);
        $(this).attr('data-state', 'still');
        }
      });
    }
  });
});

$("#add-show").on("click", function(event) {
  event.preventDefault();

  var show = $("#show-input").val().trim();
  shows.push(show);
  renderButtons();
  $('#show-input').val("");
});
