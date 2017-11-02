$(document).ready(function() {

var creatures = ['cat','dog','mouse','bird','monkey','fish','turtle','frog','zebra','bear'];
  function generateButtons(arrayToUse, creatureAdditions, picSpace) {
    $(picSpace).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var addition = $("<button>");
      addition.addClass(creatureAdditions);
      addition.attr("data-type", arrayToUse[i]);
      addition.text(arrayToUse[i]);
      $(picSpace).append(addition);
    }
  }

  $(document).on("click", ".pet-button", function() {
    $("#creatures").empty();
    $(".pet-button").removeClass("active");
    $(this).addClass("active");
    var findPets = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + findPets + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL,method: "GET"})

    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal-item\">");
        var rating = results[i].rating;
        var ratings = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");
        animalDiv.append(ratings);
        animalDiv.append(animalImage);

        $("#creatures").append(animalDiv);
      }
    });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#critterAdd").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();
    if (newAnimal.length > 2) {
      creatures.push(newAnimal);
    }

  generateButtons(creatures, "pet-button", "#furryButtons");
  });

  generateButtons(creatures, "pet-button", "#furryButtons");
});