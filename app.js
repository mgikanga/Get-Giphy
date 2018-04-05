$(document).ready(function () {
    // array for the search title
    var title = ["alien", "minion", "cartoon", "pokemon"];
    // function to render the buttons
    function displayButtons() {
        //empty the html container first
        $("#right-here").empty();
        for (var i = 0; i < title.length; i++) {
            //create a variable to hold the titles
            var a = $("<button>");
            // Adding a class of giphy to our button
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
            //empty the image content holder
            $("#content-area").empty();
            // Grabbing and storing the data-animal property value from the button
            var search = $(this).attr("data-animal");
            //generating the queryURL in respect to the array
            var url = 'https://api.giphy.com/v1/gifs/search?&q=';
            var apiKey = '&api_key=gvdNGfXK5Y5LmpIOMmB7rInEXLSd33G6';
            var queryURL = url + search + apiKey;
            var rating = '&q=&rating=G';
            //json call
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                //jason response
                .then(function (response) {
                    console.log(response);

                    //for loop to render the images
                    var numGif = $("#giphy-count").val();
                    console.log(numGif)
                    var results = response.data;
                    for (i = 0; i < numGif; i++) {

                        //div to hold the images
                        var contentArea = $("<div>");
                        // image element declaration
                        var imageContainer = $("<div>");
                        //div container for each image
                        imageContainer.attr('class', 'col-md-4');
                        contentArea.append(imageContainer);
                        //image to append to the web
                        var pickStill = $("<img>");
                        var like = $("<div>");
                        //image for user to like the image
                        var likeimg = $("<img>");
                        likeimg.attr('src', 'images/like.png');
                        likeimg.addClass("likeit");
                        likeimg.attr("gif-index", i)
                        likeimg.attr({ width: '30px', height: '30px' });
                        like.prepend(likeimg);
                        //set attribute for data-animate image 
                        pickStill.attr('data-animate', results[i].images.fixed_height.url);
                        pickStill.addClass('gif');
                        pickStill.attr('data-state', 'still');
                        pickStill.attr({ width: '350px', height: '220px' });
                        //set attribute for data-still image
                        pickStill.attr('data-still', results[i].images.fixed_height_still.url);
                        var rate = $("<p>");
                        rate.text("Rating: " + results[i].rating);
                        //link for still image
                        pickStill.attr('src', results[i].images.fixed_height_still.url);
                        //path rating for the image
                        rate.attr(results[i].rating);
                        imageContainer.append(pickStill);
                        imageContainer.append(like);
                        imageContainer.append(rate);
                        //append image and rating to the page
                        $("#content-area").prepend(contentArea);

                        /* need to work on this for favarites
                        $(".likeit").on('click', function () {
                            $(pickStill)
                .clone()
                .appendTo("#favs");
                           // $('#favs').clone(pickStill);
                            //$('#favs').append(pickStill);
                            console.log("hi");

                        });*/
                    }


                })
                // method for pausing gifs
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
        //clear the text area after the button appends
        $("#giphy-input").val("");
    });
    //call function to load buttons to the page
    displayButtons();


});