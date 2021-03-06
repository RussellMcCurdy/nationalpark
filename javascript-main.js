'use strict';


const apiKey = 'GpwiEoXbWPyMJreecbw2PYC456cNgk972ippkBgd'; 
const baseURL = 'https://developer.nps.gov/api/v1/places';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h2>${responseJson.data[i].title}</h2>
      <h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
      <p>${responseJson.data[i].listingDescription}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
}

function getParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#state').val().toUpperCase();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);