$( document ).ready(function() {

    var title = ["cat","duck","snake"];
    // function to render the buttons
    function displayButtons(){
    //empty the html first
    $("#right-here").empty();
    for (var i = 0; i < title.length; i++) {
 
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("giphy");
        // Adding a data-attribute
        a.attr("data-animal", title[i]);
        // Providing the initial button text
        a.text(title[i]);
        // Adding the button to the HTML
        $("#right-here").append(a);
       
    }
       }
displayButtons();

//function that add giphy that a user inputs
$("#add-giphy").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var giphy = $("#giphy-input").val().trim();

    // Adding the movie from the textbox to our array
    title.push(giphy);

    // Calling renderButtons which handles the processing of our movie array
    displayButtons();

});
       // display the images on click
    $("button").on("click", function() {

        //empty the content holder
        $("#content-area").empty();
        // Grabbing and storing the data-animal property value from the button
        var search = $(this).attr("data-animal");
   var url = 'https://api.giphy.com/v1/gifs/search?&q=';
    var apiKey = '&api_key=gvdNGfXK5Y5LmpIOMmB7rInEXLSd33G6&limit=10';
    var queryURL = url+ search + apiKey;
    var limit = '&limit=10';
    var rating = '&q=&rating=G';
 $.ajax({
     url:queryURL,
     method: "GET"
 })
 .then(function(response){
     console.log(response);
var results = response.data;
for(i=0; i<results.length; i++){
 var contentArea = $("<div>");
var pickAnime = $("<img>");
var pickStill = $("<img>");
pickAnime.addClass('class', 'gif');
pickAnime.attr('data-state', 'animate');
pickAnime.attr('data-animate', results[i].images.fixed_height_small.url);
pickStill.addClass('class', 'gif');
pickStill.attr('data-state', 'still');
pickStill.attr('data-still', results[i].images.fixed_height_still.url);
var rate = $("<p>");
rate.text("Rated: " + results[i].rating);
pickStill.attr('src',results[i].images.fixed_height_still.url);
pickAnime.attr('src',results[i].images.fixed_height_small.url);
rate.attr(results[i].rating);
contentArea.append(pickStill);
contentArea.append(rate);
$("#content-area").prepend(contentArea);
}
});
 });

  // when gif is clicked
$(".gif").on("click", function() {
    console.log("gifffy");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });  
});