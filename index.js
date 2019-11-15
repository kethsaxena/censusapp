function watchForm() {
  $('.stateEntry').submit(function(e) {
  e.preventDefault();
  getStateInfo();
})};

function getStateInfo() {
  let APIKey = "x";
  let endpoint = "https://api.census.gov/data/2010/dec/slf?";
  let state = $('.state').val();
  let numbers = $('.secondinput').val();
  let url = `${endpoint}get=${numbers}&for=state:${state}&key=${APIKey}`
  console.log(url);
//  fetch(url)
//    .then(response => {
//      if (response.ok) {
//        return response.json();
//};
//        throw new Error(response.statusText);
//})
//    .then(response => response.json())
//    .then(responseJson => 
//      displayResults(responseJson))
//    .catch(error => alert('Something went wrong.'));
}

function displayResults(responseJson) {
  $('.results').empty();
  for (let i = 0; i < responseJson.data.length; i++){
//    $('.results').append(`<p>${responseJson.data[i].stats}</p>
//      <p><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
//      <p>${responseJson.data[i].description}</p>
//      <p>${responseJson.data[i].directionsInfo}</p>
//      <p><a href="${responseJson.data[i].directionsUrl}" target="_blank">${responseJson.data[i].directionsUrl}</a></p>
//      <p>${responseJson.data[i].latLong}</p>
//      <hr>`
    };
  $('.results').removeClass('hidden');
};

$(function() {
  watchForm();
});

//function pull(query, limit=10) {
//  let params = {
//    code: state,
//    key: APIKey,
//    max,
//  };
//  let queryString = formatQueryParams(params)
//  let url = endpoint + '?' + queryString;
//}

//function formatQueryParams(params) {
//  let queryItems = Object.keys(params)
//    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//  return queryItems.join('&');
//}
