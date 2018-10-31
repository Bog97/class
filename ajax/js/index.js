'use strict';

// State of the application
let state = {
    query: ""
};

// Base of the api
const urlBase = "https://api.github.com/search/repositories?sort=stars&q=";

// Keep track of state 
$("input").on("change", function() {
    state.query = $("input").val();
});

// Create a click event for your button
$('form').submit(function (event) {
    // Prevent the default behavior for your event
    event.preventDefault();

    // Get the value of your queryInput, and construct your API query
    let query = $("input").val();
    let url = urlBase + state.query;
    console.log(url);

    // Fetch the data at that URL, THEN
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        renderSearchResults(data);
    }).catch(function(error) {
        console.error(error);
    })
    // Return the `.json()` of the response, THEN
    // Pass the results to renderSearchResults, make sure to CATCH
    // Any of your errors
    $("input").val("");
    state.query = "";


    return false; // prevent unwanted page behavior
});

// Write a function to render an <li> inside of a parent
// You should display the title as a link, and
// The description of the repo
function renderItem(item, parent) {
    let ele = $("<li>");
    ele.append(`<strong><a href="${item.html_url}">${item.full_name}</a></strong>`);
    ele.append(`<span>${item.description}</span>`);
    parent.append(ele);
}

// let testItem = {
//     html_url: "https://google.com",
//     full_name: "Google",
//     description: "This is a test!"
// }

// renderItem(testItem, $("ul"));

// Write a function to render search results. 
// It should iterate through items and call the renderItem method
function renderSearchResults(results) {
    // Create a new ul as the parent + append it to the body
    $("ul").empty();

    // Iterate through results and call the renderItem method
    results.items.forEach(function(d) {
        renderItem(d, $("ul"));
    })

}
