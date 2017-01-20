
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
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr +', ' + cityStr;

    // .text means to add text to the page
    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    // append Insert content, specified by the parameter, to the end of each element in the set of matched elements.
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    


    // NYTimes AJAX request goes here
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr + '&sort=newest&api-key=16298ba2aec24a4fb62ba3ab75ccf0ba';
        
        $.getJSON(nytimesUrl, function (data){
        $nytHeaderElem.text('New York Times Articles About' + cityStr);

        articles = data.response.docs;
            for(var i = 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + 
                '<a href ="'+article.web_url+'">'+article.headline.main+
                '</a>'+'<p>' + article.snippet + '</p>' +
                 '</li>');
            }
    });


}

$('#form-container').submit(loadData);
return false;
