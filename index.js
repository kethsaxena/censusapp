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

  numCheckedStates = $('input[name=state]:checked').length;
  numCheckedRaces = $('input[name=race]:checked').length;
  numCheckedSexes = $('input[name=sex]:checked').length;

  let checkedstate = [];
  whichstate = [];
  $('input[name=state]:checked').each(function () {
    checkedstate.push($(this).val());
    whichstate.push($(this).attr("id"));
  });
  let stateid = checkedstate.join(",");
  let stateArray = checkedstate.join(", ");

//  console.log(stateid);
//  console.log(whichstate);

  checkedrace = [];
  whichrace = [];
  $('input[name=race]:checked').each(function () {
    checkedrace.push($(this).val());
    whichrace.push($(this).attr("id"));
  });
  let raceid = checkedrace.join(",");
  let raceArray = checkedrace.join(", ");

  let comma = "";
  if (numCheckedStates === 0) {
    alert("Please choose one or more States.");
  }
  if (numCheckedSexes !== 0) {
    comma += ",";
  }

  checkedsexes = [];
  whichsexes = [];
  $('input[name=sex]:checked').each(function () {
    checkedsexes.push($(this).val());
    whichsexes.push($(this).attr("id"));
  });
  let sexid = checkedsexes.join(",");
  let sexArray = checkedsexes.join(", ");

//  console.log(raceid)
//  console.log(whichrace);

  let url = `${endpoint}get=${raceid}${comma}${sexid}&for=state:${stateid}&key=${APIKey}`;
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
//    let results = [];
//  let firstSet = [];
//  for (let i = 1; i < (responseJson.length - 0); i++) {
//     for (let key in responseJson[i]) {
//       let response = responseJson[i][key];
//       results.push(`${response}`);
//       console.log(response);
//       $('.results2').append(`${response}`);
//     };
//    let response = responseJson[i];
//    let modifiedResponse = response.slice(0, -1);
//    let secondSet = [];
//    if (checkedrace == "") {
//      comma += ",";
//    }
//    console.log(response);
//    console.log(modifiedResponse);
//    firstSet.push(`${modifiedResponse}`);
//  };
//  console.log(firstSet);
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
    let table3 = `<table><tr>`;
    let first = [];
    let second = [];

    $.map(whichstate, function(k) {
      table2 += `<tr><th>${k}</th></tr>`;
    });
    $.map(whichrace, function(n) {
    table += `<th>${n}</th>`;
    });
    table += `</tr>`;
    $.map(whichsexes, function(u) {
    table3 += `<td>${u}</td>`;
    });
    table3 += `</tr>`;

    for (let i = 1; i < responseJson.length; i++) {
      let response = responseJson[i];
      let modifiedResponse = response.slice(0, -1);
       if (numCheckedRaces !== 0) {
         console.log(modifiedResponse);
         first.push(modifiedResponse.slice(0, numCheckedRaces))
         second.push(modifiedResponse.slice(numCheckedRaces));
         console.log(first);
         console.log(second);
       }
      table += `<tr>${modifiedResponse.map(h => `<td>${h}</td>`).join('')}</tr>`;
    };
    
    for (let i = 0; i < second.length; i++) {
       table3 += `<tr>${second[i].map(h => `<td>${h}</td>`).join('')}</tr>`;
     }
  
    table += `</table>`;
    table2 += `</table>`;
    table3 += `</tr></table>`;
    console.log(table);
    console.log(table2);
    console.log(table3);
    $('.resultsRaces').append(table);
    $('.resultsStates').append(table2);
    $('.resultsSexes').append(table3);
  })


//   let results = [];
//   let firstSet = [];
//   for (let i = 1; i < (responseJson.length - 0); i++) {
//      for (let key in responseJson[i]) {
//        let response = responseJson[i][key];
//        results.push(`${response}`);
//        console.log(response);
//        $('.results2').append(`${response}`);
//      };
//     let response = responseJson[i];
//     modifiedResponse = response.slice(0, -1);
//     console.log(response);
//     console.log(modifiedResponse);
//     firstSet.push(`${modifiedResponse}`);
//   };
//   console.log(firstSet);


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