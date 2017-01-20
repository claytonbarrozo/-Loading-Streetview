
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
    return false;
};

$('#form-container').submit(loadData);
