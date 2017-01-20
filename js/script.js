
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    // The .val() method is primarily used to get the values of form elements such as input, select and textarea. When called on an empty collection, it returns undefined.
    // #street means the id 

    //<--- Gogole street view --->
    var streetStr = $('#street').val().toUpperCase();
    var cityStr = $('#city').val().toUpperCase();
    var address = streetStr +', ' + cityStr; // added the toUpperCase so all the letters are up case

    // .text means to add text to the page
    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    // append Insert content, specified by the parameter, to the end of each element in the set of matched elements.
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    
    //<--- End Gogole street view --->

    // <--- NYTimes AJAX request goes here --->
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr + '&sort=newest&api-key=16298ba2aec24a4fb62ba3ab75ccf0ba';
        
        $.getJSON(nytimesUrl, function(data){ // this starts the json

        $nytHeaderElem.text('New York Times Articles About ' + cityStr); // this add the txt to the header

         articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) { // loops starts
            var article = articles[i];
            $nytElem.append('<li class="article">' + // append the text into artcle class
                '<a href ="'+article.web_url+'">'+article.headline.main+
                '</a>' + '<p>' + article.snippet + '</p>' +
                 '</li>');
            }
    })

        // <----- End NYTimes Function --->

        // <----- Error Function --->
        // Added .error function if the website is down the following msg will show New York Times Articles Error'
        .error(function(e){ // this the error function
            $nytHeaderElem.text('New York Times Articles Error'); // this code attaches the msg to nytHeaderElem if there no connection

        });
        // <---- End of the error function --->


        // <--- Wikipedia AJAX request goes here --->
        

        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';


        // Error handlin with Jsonp
        var wikiRequestTimeout = setTimeout(function(){
            $wikiElem.text("Failed to get wikipedia resources");
        }, 8000);


        $.ajax({ // ajax request object
            url: wikiUrl, // setting url to wikiUrl from the top
            dataType: "jsonp", // this indicates that this is a jsonp request
            // jsonp: 'callback',
            success: function( response ) { //when it runs we get the response
                var articleList = response[1];

                for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                
                var url ='http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>'); // each article is appedn to the page
            }
            
            // 
            clearTimeout(wikiRequestTimeout);
            
            }


        });





        // <--- End of Wikipedia AJAX request goes here --->
return false;

}

$('#form-container').submit(loadData);






