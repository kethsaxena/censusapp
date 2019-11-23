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
  $('.plussign4').click(function () {
    $('.checkboxchild4').toggle();
  });
  $('.plussign5').click(function () {
    $('.checkboxchild5').toggle();
  });
  $('#selectall').click(function() {
    $('input[type=checkbox]').prop('checked', true);
  });
  $('#unselectall').click(function() {
    $('input[type=checkbox]').prop('checked', false);
  });
}

function getStateInfo() {
  let APIKey = "12ba7d01dfe85e9b84c731fceefc830022291a8f";
  let endpoint = "https://api.census.gov/data/2010/dec/sf1?";

  numCheckedStates = $('input[name=state]:checked').length;
  numCheckedRaces = $('input[name=race]:checked').length;
  numCheckedSexes = $('input[name=sex]:checked').length;
  numCheckedAges = $('input[name=age]:checked').length;
  numCheckedHousehold = $('input[name=household]:checked').length;

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

  checkedsexes = [];
  whichsexes = [];
  $('input[name=sex]:checked').each(function () {
    checkedsexes.push($(this).val());
    whichsexes.push($(this).attr("id"));
  });
  let sexid = checkedsexes.join(",");

  checkedage = [];
  whichage = [];
  $('input[name=age]:checked').each(function () {
    checkedage.push($(this).val());
    whichage.push($(this).attr("id"));
  });
  let ageid = checkedage.join(",");

  checkedhousehold = [];
  whichhousehold = [];
  $('input[name=household]:checked').each(function () {
    checkedhousehold.push($(this).val());
    whichhousehold.push($(this).attr("id"));
  });
  let householdid = checkedhousehold.join(",");

  let comma = "";
  if (numCheckedStates === 0) {
    alert("Please choose one or more States.");
  }
  if (numCheckedSexes !== 0) {
    comma += ",";
  }

  let comma2 = "";
  if (ageid != 0) {
    comma2 += ",";
  }

  let comma3 = "";
  if (householdid != 0) {
    comma3 += ",";
  }

  let url = `${endpoint}get=${raceid}${comma}${sexid}${comma2}${ageid}${comma3}${householdid}&for=state:${stateid}&key=${APIKey}`;
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
  $('.resultsAges').empty();
  $('.resultsHousehold').empty();

  $(function printResults() {
    let tableStates = `<table>`;
    let tableRaces = `<table><tr>`;
    let tableSexes = `<table><tr>`;
    let tableAges = `<table><tr>`;
    let tableHousehold = `<table><tr>`;

    let racesValues = [];
    let sexesValues = [];
    let agesValues = [];
    let householdValues = [];

    $.map(whichstate, function(k) {
      tableStates += `<tr><th>${k}</th></tr>`;
    });
    $.map(whichrace, function(n) {
      tableRaces += `<th>${n}</th>`;
    });
    $.map(whichsexes, function(u) {
      tableSexes += `<th>${u}</th>`;
    });
    $.map(whichage, function(b) {
      tableAges += `<th>${b}</th>`;
    });
    $.map(whichhousehold, function(w) {
      tableHousehold += `<th>${w}</th>`;
    });


    tableRaces += `</tr>`;
    tableSexes += `</tr>`;
    tableAges += `</tr>`;
    tableHousehold += `</tr>`;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let numCheckedRacesAndSexes = (numCheckedRaces + numCheckedSexes);
    let numCheckedRacesSexesandAges = (numCheckedRacesAndSexes + numCheckedAges)

    for (let i = 1; i < responseJson.length; i++) {
      let response = responseJson[i];
      let modifiedResponse = response.slice(0, -1);
      racesValues.push(response.slice(0, numCheckedRaces))
      sexesValues.push(response.slice(numCheckedRaces, numCheckedRacesAndSexes))
      agesValues.push(response.slice(numCheckedRacesAndSexes, numCheckedRacesSexesandAges));
      householdValues.push(response.slice(numCheckedRacesSexesandAges, -1))

      //  if (numCheckedRaces !== 0) {
      //     console.log(modifiedResponse);
      //     racesValues.push(modifiedResponse.slice(0, numCheckedRaces));
      //  }
      //  if (numCheckedSexes != 0) {
      //     sexesValues.push(modifiedResponse.slice(numCheckedRaces));
      //  }
      //  if (numCheckedAges != 0) {
      //     agesValues.push(modifiedResponse.slice(numCheckedRacesAndSexes));
      //  }
      // table += `<tr>${modifiedResponse.map(h => `<td>${h}</td>`).join('')}</tr>`;

    };

    console.log(racesValues);
    console.log(sexesValues);
    console.log(agesValues);
    console.log(householdValues);

    for (let i = 0; i < racesValues.length; i++) {
      tableRaces += `<tr>${racesValues[i].map(h => `<td>${numberWithCommas(h)}</td>`).join('')}</tr>`;
    }
    
    for (let i = 0; i < sexesValues.length; i++) {
      tableSexes += `<tr>${sexesValues[i].map(p => `<td>${numberWithCommas(p)}</td>`).join('')}</tr>`;
    }

    for (let i = 0; i < agesValues.length; i++) {
      tableAges += `<tr>${agesValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
   }

    for (let i = 0; i < householdValues.length; i++) {
      tableHousehold += `<tr>${householdValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
 }
  
    tableRaces += `</table>`;
    tableStates += `</table>`;
    tableSexes += `</table>`;
    tableAges += `</table>`;
    tableHousehold += `</table>`;
    console.log(tableRaces);
    console.log(tableStates);
    console.log(tableSexes);
    console.log(tableAges);
    console.log(tableHousehold);
    $('.resultsRaces').append(tableRaces);
    $('.resultsStates').append(tableStates);
    $('.resultsSexes').append(tableSexes);
    $('.resultsAges').append(tableAges);
    $('.resultsHousehold').append(tableHousehold);
  })

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