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

  checkedstate = [];
  whichstate = [];
  $('input[name=state]:checked').each(function () {
    checkedstate.push($(this).val());
    whichstate.push($(this).attr("id"));
  });
  let stateid = checkedstate.join(",");

  checkedrace = [];
  whichrace = [];
  $('input[name=race]:checked').each(function () {
    checkedrace.push($(this).val());
    whichrace.push($(this).attr("id"));
  });
  let raceid = checkedrace.join(",");

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

  $(function printResults() {
    let tableRaces = `<table><tr>`;
    let tableStates = `<table>`;
    let tablesSexes = `<table><tr>`;
    let racesValues = [];
    let sexesValues = [];

    $.map(whichstate, function(k) {
      tableStates += `<tr><th>${k}</th></tr>`;
    });
    $.map(whichrace, function(n) {
    tableRaces += `<th>${n}</th>`;
    });
    tableRaces += `</tr>`;
    $.map(whichsexes, function(u) {
    tablesSexes += `<td>${u}</td>`;
    });
    tablesSexes += `</tr>`;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    for (let i = 1; i < responseJson.length; i++) {
      let response = responseJson[i];
      let modifiedResponse = response.slice(0, -1);
       if (numCheckedRaces !== 0) {
         console.log(modifiedResponse);
         racesValues.push(modifiedResponse.slice(0, numCheckedRaces))
         sexesValues.push(modifiedResponse.slice(numCheckedRaces));
         console.log(racesValues);
         console.log(sexesValues);
       }
//      table += `<tr>${modifiedResponse.map(h => `<td>${h}</td>`).join('')}</tr>`;
    };

    for (let i = 0; i < racesValues.length; i++) {
      tableRaces += `<tr>${racesValues[i].map(h => `<td>${numberWithCommas(h)}</td>`).join('')}</tr>`;
    }
    
    for (let i = 0; i < sexesValues.length; i++) {
       tablesSexes += `<tr>${sexesValues[i].map(h => `<td>${numberWithCommas(h)}</td>`).join('')}</tr>`;
    }
  
    tableRaces += `</table>`;
    tableStates += `</table>`;
    tablesSexes += `</tr></table>`;
    console.log(tableRaces);
    console.log(tableStates);
    console.log(tablesSexes);
    $('.resultsRaces').append(tableRaces);
    $('.resultsStates').append(tableStates);
    $('.resultsSexes').append(tablesSexes);
  })

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