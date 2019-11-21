function watchForm() {
  $('.totalInput').submit(function (e) {
    e.preventDefault();
    getStateInfo();
  })
};

function collapseExpand() {
  $('.plussign1').click(function () {
    $('.checkboxchild1').toggle();
  });
  $('.plussign2').click(function () {
    $('.checkboxchild2').toggle();
  });
  $('.plussign3').click(function () {
    $('.checkboxchild3').toggle();
  });
}

function getStateInfo() {
  let APIKey = "12ba7d01dfe85e9b84c731fceefc830022291a8f";
  let endpoint = "https://api.census.gov/data/2010/dec/sf1?";

  let checkedstate = [];
  whichstate = [];
  $('input[name=state]:checked').each(function () {
    checkedstate.push($(this).val());
    whichstate.push($(this).attr("id"));
  });
  let stateid = checkedstate.join(",");
  let stateArray = checkedstate.join(", ");

//  console.log(stateid);
  console.log(whichstate);

  let checkedrace = [];
  whichrace = [];
  $('input[name=race]:checked').each(function () {
    checkedrace.push($(this).val());
    whichrace.push($(this).attr("id"));
  });
  let raceid = checkedrace.join(",");
  let raceArray = checkedrace.join(", ");

  if (checkedstate == "") {
    alert("Please choose one or more States.");
  }

  let checkedsexes = [];
  whichsexes = [];
  $('input[name=sex]:checked').each(function () {
    checkedsexes.push($(this).val());
    whichsexes.push($(this).attr("id"));
  });
  let sexid = checkedsexes.join(",");
  let sexArray = checkedsexes.join(", ");

//  console.log(raceid)
  console.log(whichrace);

  numCheckedStates = $('input[name=state]:checked').length;
  numCheckedRaces = $('input[name=race]:checked').length;
  numCheckedSexes = $('input[name=sex]:checked').length;

  let url = `${endpoint}get=${raceid}&for=state:${stateid}&key=${APIKey}`;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      };
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayResults(responseJson))
    .catch(error => console.log(error));
}

function displayResults(responseJson) {
  $('.resultsStates').empty();
  $('.resultsRaces').empty();
  $('.resultsSexes').empty();
  //  let results = [];
  let values = [];
  for (let i = 1; i < (responseJson.length - 0); i++) {
//     for (let key in responseJson[i]) {
//       let response = responseJson[i][key];
//       results.push(`${response}`);
//       console.log(response);
//       $('.results2').append(`${response}`);
//     };
    let response = responseJson[i];
    let response2 = response.slice(0, -1);
    console.log(response2);
    values.push(`${response2}`);
  };
  console.log(values);
  //  const headings = responseJson[0];
  //  console.log(headings);
  //  let table = `<table><tr>${headings.map(h => `<th>${h}</th>`).join('')}</tr>`
  //  console.log(table);

//   for (let i = 0; i < whichrace.length; i++) {
//     let whichraces = whichrace[i];
//   table += `<tr>${whichraces.(h => `<th>${h}</th>`).join('')}</tr>`
//   };

  $(function printResults() {
    let table = `<table><tr>`;
    let table2 = `<table>`;
    $.map(whichstate, function(k) {
      table2 += `<tr><th>${k}</th></tr>`;
    });
    table2 += `</table>`;
    table += `</tr><tr>`;
    $.map(whichrace, function(n) {
    table += `<th>${n}</th>`;
    });
    table += `</tr>`;
    for (let i = 1; i < responseJson.length; i++) {
      let response = responseJson[i];
      let response2 = response.slice(0, -1);
      table += `<tr>${response2.map(h => `<td>${h}</td>`).join('')}</tr>`;
    };
    table += `</table>`;
    console.log(table);
    console.log(table2);
    $('.resultsStates').append(table2);
    $('.resultsRaces').append(table);
  })


//   let results = [];
//   let values = [];
//   for (let i = 1; i < (responseJson.length - 0); i++) {
//      for (let key in responseJson[i]) {
//        let response = responseJson[i][key];
//        results.push(`${response}`);
//        console.log(response);
//        $('.results2').append(`${response}`);
//      };
//     let response = responseJson[i];
//     response2 = response.slice(0, -1);
//     console.log(response);
//     console.log(response2);
//     values.push(`${response2}`);
//   };
//   console.log(values);


// console.log(numCheckedStates);
// console.log(numCheckedRaces);
// console.log(numCheckedSexes);

};

/////////////////////// javascript for checkboxes

$('input[type="checkbox"]').change(function (e) {

  var checked = $(this).prop("checked"),
    container = $(this).parent(),
    siblings = container.siblings();

  container.find('input[type="checkbox"]').prop({
    indeterminate: false,
    checked: checked
  });

  function checkSiblings(el) {

    var parent = el.parent().parent(),
      all = true;

    el.siblings().each(function () {
      let returnValue = all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
      return returnValue;
    });

    if (all && checked) {

      parent.children('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });

      checkSiblings(parent);

    } else if (all && !checked) {

      parent.children('input[type="checkbox"]').prop("checked", checked);
      parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
      checkSiblings(parent);

    } else {

      el.parents("li").children('input[type="checkbox"]').prop({
        indeterminate: true,
        checked: false
      });

    }

  }

  checkSiblings(container);
});

////////////////////// end javascript for checkboxes

$(function () {
  watchForm();
  collapseExpand();
});