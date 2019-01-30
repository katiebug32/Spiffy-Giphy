


var topics = ["happy", "sad", "funny", "ouch", "nope", "mad", "embarassed", "yuck", "tired", "whatever"];
var offsets = {};

function addNewGifButtons() {
  $("#buttonDisplay").empty();
  for (var i = 0; i < topics.length; i++) {
    console.log(topics[i]);
    var a = $("<button>");
    a.addClass("btn btn-info");
    a.attr("data-word", topics[i]);
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttonDisplay").append(a);
  };
};

$("#searchField").on("click", "#searchButton", function (event) {
  event.preventDefault();
  var userInput = $("#searchText").val().trim();
  if ($.inArray(userInput, topics) === -1) {
    topics.push(userInput);
    console.log(topics);
    $("#searchText").val("");
    addNewGifButtons();
  }
    else {
      alert("That gif search button already exists.");
      $("#searchText").val("");
    };
  });


$("#buttonDisplay").on("click", ".btn", function (displayGIFS) {
  var searchWord = $(this).attr("data-word");
  var currentOffset = offsets[searchWord];
  if(!currentOffset) {
    currentOffset = 0;
  } 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchWord + "&api_key=357L9jJO3KPSOgW5VmX72OQE2BTx6sIF&offset=" +currentOffset +"&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    console.log(results);
    currentOffset = currentOffset + results.length;
    offsets[searchWord] = currentOffset;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;
      if (rating === "g" || rating === "y" || rating === "pg" || rating === "pg-13") {
        var gifImage = $("<img>");
        gifImage.attr({
          "src": results[i].images.fixed_height_still.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animate": results[i].images.fixed_height.url,
          "data-state": "still",
          "class": "gif",
        });
        gifDiv.append(gifImage);

        $("<p>").text("Rating: " + rating).appendTo(gifDiv);
        $("<p>").text("Title: " + results[i].title).appendTo(gifDiv);
        // $("<button>").text("Download").attr({
        //   "id": "downloadButton",
        //   "class": "btn btn-info",
        //   "<a href": results[i].embed_url + "</a>"}).appendTo(gifDiv);
          // $("#downloadButton").html("<a href=" + results[i].embed_url + "</a>");
        // $("downloadButton").attr("a href=" + results[i].embed_url);
        

        $("#gifDisplay").prepend(gifDiv);
        $("#loadMore").css("display", "block");
      };
    };
  });
});


$("#loadMore").on("click", function(displayGIFS){
  
});

//gif is still or animates, based on click of gif//
$("#gifDisplay").on("click", ".gif", function () {
  console.log("clicked");
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  };
});



addNewGifButtons();