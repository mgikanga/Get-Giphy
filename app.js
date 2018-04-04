$(document).ready(function () {

    var title = ["cat", "duck", "snake"];
    // function to render the buttons
    function displayButtons() {
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


    // display the images on click
    $("button").on("click", function () {
        //empty the content holder
        $("#content-area").empty();
        // Grabbing and storing the data-animal property value from the button
        var search = $(this).attr("data-animal");
        var url = 'https://api.giphy.com/v1/gifs/search?&q=';
        var apiKey = '&api_key=gvdNGfXK5Y5LmpIOMmB7rInEXLSd33G6&limit=10';
        var queryURL = url + search + apiKey;
        var limit = '&limit=10';
        var rating = '&q=&rating=G';
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data;
                //for loop to display the images
                for (i = 0; i < results.length; i++) {

                    //div to hold the images
                    var contentArea = $("<div>");
                    // image element declaration
        
                    var pickStill = $("<img>");
                   
                 
                   
                    //link for data-animate image 
                    pickStill.attr('data-animate', results[i].images.fixed_height.url);
                    pickStill.addClass('gif');
                    pickStill.attr('data-state', 'still');

                    //link for data-still image
                    pickStill.attr('data-still', results[i].images.fixed_height_still.url);
                    var rate = $("<p>");
                    rate.text("Rating: " + results[i].rating);
                    //link for still image
                    pickStill.attr('src', results[i].images.fixed_height_still.url);
                    //link for animated image
                    
                    rate.attr(results[i].rating);
                    contentArea.append(pickStill);
                    contentArea.append(rate);
                    //append image to the page
                    $("#content-area").prepend(contentArea);
                }

    
            })

            .then(function () {
                console.log('im here');
    $(".gif").on('click', function () {
        console.log("heck");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            console.log(this);
            $(this).attr("data-state", "animate");
            console.log(this);
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    })
            })

    });
    }


    //function that add giphy that a user inputs
    $("#add-giphy").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var giphy = $("#giphy-input").val().trim();

        // Adding the movie from the textbox to our array
        title.push(giphy);

        // Calling renderButtons which handles the processing of our movie array
        displayButtons();
    });

    displayButtons();

});