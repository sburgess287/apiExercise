'use strict'

function getRepos(searchTerm) {
    fetch(`https://api.github.com/users/${searchTerm}/repos`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            console.log(error);
            $('#js-error-message').replaceWith(`<p>No results found.</p>`);
        });

}

function displayResults(responseJson, searchTerm){
    console.log(responseJson);
    const allReposName = responseJson.map(newArray =>
        `<li><p>${newArray.name}</p></li>
        <li><p>${newArray.url}<p></li>
        `
    )
    console.log(allReposName);
    $('#results-list').replaceWith(allReposName.join(''));
    $('#results').removeClass('hidden');

}

// on form submit, get the value of the form and pass to 
// the function to search the git repos
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('watchForm ran');
        const searchTerm = $('#js-search-term').val();
        console.log(searchTerm);
        $('#js-search-term').val('');
        getRepos(searchTerm);
    });
}

$(watchForm);