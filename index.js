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
  $('#selectallmap').click(function() {
    $('path').attr("fill", "red");
    $('circle').attr("fill", "red");
  });
  $('#unselectallmap').click(function() {
    $('path').attr("fill", "#D3D3D3");
    $('circle').attr("fill", "#D3D3D3");
  });
}

$('path').click(function() {
  if($(this).attr("fill") == "red")
    {
      $(this).attr("fill", "#D3D3D3");
    }
    else
    {
      $(this).attr("fill", "red");
    }
});

$('circle').click(function() {
  if($(this).attr("fill") == "red")
    {
      $(this).attr("fill", "#D3D3D3");
    }
    else
    {
      $(this).attr("fill", "red");
    }
});

//////////////////////////// Map Stuff

$("path, circle").hover(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});

$(document).mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
}).mouseover();

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link,'_blank');
    return false;
  });
}

//////////////////////// End Map Stuff

function getStateInfo() {
  let APIKey = "12ba7d01dfe85e9b84c731fceefc830022291a8f";
  let endpoint = "https://api.census.gov/data/2010/dec/sf1?";

  checkedState = [];
  whichState = [];
  $('path').each(function () {
    if ($(this).attr("fill") == "red") {
      whichState.push($(this).attr("name"));
      checkedState.push($(this).attr("id"));
    }
  });
  $('circle').each(function () {
    if ($(this).attr("fill") == "red") {
      whichState.push($(this).attr("name"));
      checkedState.push($(this).attr("id"));
    }
  });

  if ($('path[id=path67]').attr("fill") == "red") {
    whichState = whichState.slice(0, -2);
    checkedState = checkedState.slice(0, -2);
  }

  let stateID = checkedState.join(",");

  checkedRace = [];
  whichRace = [];
  $('input[name=race]:checked').each(function () {
    checkedRace.push($(this).val());
    whichRace.push($(this).attr("id"));
  });
  let raceID = checkedRace.join(",");

  checkedSizes = [];
  whichSizes = [];
  $('input[name=size]:checked').each(function () {
    checkedSizes.push($(this).val());
    whichSizes.push($(this).attr("id"));
  });
  let sizeID = checkedSizes.join(",");

  checkedAS = [];
  whichAS = [];
  $('input[name=AS]:checked').each(function () {
    checkedAS.push($(this).val());
    whichAS.push($(this).attr("id"));
  });
  let ASID = checkedAS.join(",");

  checkedHousehold = [];
  whichHousehold = [];
  $('input[name=household]:checked').each(function () {
    checkedHousehold.push($(this).val());
    whichHousehold.push($(this).attr("id"));
  });
  let householdID = checkedHousehold.join(",");

  numCheckedRaces = $('input[name=race]:checked').length;
  numCheckedSizes = $('input[name=size]:checked').length;
  numCheckedAS = $('input[name=AS]:checked').length;
  numCheckedHousehold = $('input[name=household]:checked').length;

  let comma = "";
  if (numCheckedRaces != 0 && (numCheckedSizes != 0 || numCheckedAS != 0 || numCheckedHousehold != 0)) {
    comma += ",";
  }

  let comma2 = "";
  if (numCheckedSizes != 0 && (numCheckedAS != 0 || numCheckedHousehold != 0)) {
    comma2 += ",";
  }

  let comma3 = "";
  if (numCheckedAS != 0 && numCheckedHousehold != 0) {
    comma3 += ",";
  }

  let url = `${endpoint}get=${raceID}${comma}${sizeID}${comma2}${ASID}${comma3}${householdID}&for=state:${stateID}&key=${APIKey}`;
  console.log(url);

  if (stateID == "") {
    alert('Please choose a state!')
  } else if (stateID != "") {
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
    }}

function displayResults(responseJson) {

  console.log(responseJson);

  $('.resultsStates').empty();
  $('.resultsRaces').empty();
  $('.resultsSizes').empty();
  $('.resultsAS').empty();
  $('.resultsHousehold').empty();

  $(function printResults() {
    let tableStates = `<table>`;
    let tableRaces = `<table><tr>`;
    let tableSizes = `<table><tr>`;
    let tableAS = `<table><tr>`;
    let tableHousehold = `<table><tr>`;

    let racesValues = [];
    let sizesValues = [];
    let ASValues = [];
    let householdValues = [];

    $.map(whichState, function(k) {
      tableStates += `<tr><th>${k}</th></tr>`;
    });
    $.map(whichRace, function(n) {
      tableRaces += `<th>${n}</th>`;
    });
    $.map(whichSizes, function(u) {
      tableSizes += `<th>${u}</th>`;
    });
    $.map(whichAS, function(b) {
      tableAS += `<th>${b}</th>`;
    });
    $.map(whichHousehold, function(w) {
      tableHousehold += `<th>${w}</th>`;
    });


    tableRaces += `</tr>`;
    tableSizes += `</tr>`;
    tableAS += `</tr>`;
    tableHousehold += `</tr>`;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let numCheckedRacesAndSizes = (numCheckedRaces + numCheckedSizes);
    let numCheckedRacesSizesandAS = (numCheckedRacesAndSizes + numCheckedAS)

    for (let i = 1; i < responseJson.length; i++) {
      let response = responseJson[i];
      let modifiedResponse = response.slice(0, -1);
      racesValues.push(response.slice(0, numCheckedRaces))
      sizesValues.push(response.slice(numCheckedRaces, numCheckedRacesAndSizes))
      ASValues.push(response.slice(numCheckedRacesAndSizes, numCheckedRacesSizesandAS));
      householdValues.push(response.slice(numCheckedRacesSizesandAS, -1))
    };

    console.log(racesValues);
    console.log(sizesValues);
    console.log(ASValues);
    console.log(householdValues);

    for (let i = 0; i < racesValues.length; i++) {
      tableRaces += `<tr>${racesValues[i].map(h => `<td>${numberWithCommas(h)}</td>`).join('')}</tr>`;
    }
    
    for (let i = 0; i < sizesValues.length; i++) {
      tableSizes += `<tr>${sizesValues[i].map(p => `<td>${numberWithCommas(p)}</td>`).join('')}</tr>`;
    }

    for (let i = 0; i < ASValues.length; i++) {
      tableAS += `<tr>${ASValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
    }

    for (let i = 0; i < householdValues.length; i++) {
      tableHousehold += `<tr>${householdValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
    }
  
    tableRaces += `</table>`;
    tableStates += `</table>`;
    tableSizes += `</table>`;
    tableAS += `</table>`;
    tableHousehold += `</table>`;

    console.log(tableRaces);
    console.log(tableStates);
    console.log(tableSizes);
    console.log(tableAS);
    console.log(tableHousehold);

    $('.resultsRaces').append(tableRaces);
    $('.resultsStates').append(tableStates);
    $('.resultsSizes').append(tableSizes);
    $('.resultsAS').append(tableAS);
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