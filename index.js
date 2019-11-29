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
    $('.checkboxmiddle41').toggle();
    $('.checkboxmiddle42').toggle();
    $('.checkboxparent41').toggle();
  });
  $('.plussign41').click(function () {
    $('.checkboxchild41').toggle();
  });
  $('.plussign42').click(function () {
    $('.checkboxchild42').toggle();
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

  checkedASM = [];
  whichASM = [];
  $('input[name=ASM]:checked').each(function () {
    checkedASM.push($(this).val());
    whichASM.push($(this).attr("id"));
  });
  let ASMID = checkedASM.join(",");

  checkedASF = [];
  whichASF = [];
  $('input[name=ASF]:checked').each(function () {
    checkedASF.push($(this).val());
    whichASF.push($(this).attr("id"));
  });
  let ASFID = checkedASF.join(",");

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
  numCheckedASM = $('input[name=ASM]:checked').length;
  numCheckedASF = $('input[name=ASF]:checked').length;
  numCheckedHousehold = $('input[name=household]:checked').length;

  let comma = "";
  if (numCheckedRaces != 0 && (numCheckedSizes != 0 || numCheckedAS != 0 || numCheckedASM != 0 || numCheckedASF !=0 || numCheckedHousehold != 0)) {
    comma += ",";
  }

  let comma2 = "";
  if (numCheckedSizes != 0 && (numCheckedAS != 0 || numCheckedASM != 0 || numCheckedASF !=0 || numCheckedHousehold != 0)) {
    comma2 += ",";
  }

  let comma3 = "";
  if (numCheckedAS != 0 && (numCheckedASM != 0 || numCheckedASF !=0 || numCheckedHousehold != 0)) {
    comma3 += ",";
  }

  let comma4 = "";
  if (numCheckedASM != 0 && (numCheckedASF !=0 || numCheckedHousehold != 0)) {
    comma4 += ",";
  }

  let comma5 = "";
  if (numCheckedASF != 0 && numCheckedHousehold != 0) {
    comma5 += ",";
  }

  let url = `${endpoint}get=${raceID}${comma}${sizeID}${comma2}${ASID}${comma3}${ASMID}${comma4}${ASFID}${comma5}${householdID}&for=state:${stateID}&key=${APIKey}`;
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

  $('.resultsStates1').empty();
  $('.resultsStates2').empty();
  $('.resultsStates3').empty();
  $('.resultsStates4').empty();
  $('.resultsStates5').empty();
  $('.resultsRaces').empty();
  $('.resultsSizes').empty();
  $('.resultsASM').empty();
  $('.resultsASF').empty();
  $('.resultsHousehold').empty();

  $(function printResults() {
    let tableRaces = `<table><tr>`;
    let tableSizes = `<table><tr>`;
    let tableASM = `<table><tr>`;
    let tableASF = `<table><tr>`;
    let tableHousehold = `<table><tr>`;

    let tableStates1 = `<table><tr><th>Race</th></tr>`;
    let tableStates2 = `<table><tr><th>Size</th></tr>`;
    let tableStates3 = `<table><tr><th>Age(M)</th></tr>`;
    let tableStates4 = `<table><tr><th>Age(F)</th></tr>`;
    let tableStates5 = `<table><tr><th>Occupants</th></tr>`;

    let racesValues = [];
    let sizesValues = [];
    let ASValues = [];
    let ASMValues = [];
    let ASFValues = [];
    let householdValues = [];

    if (numCheckedAS != 0 && numCheckedASM != 0 && numCheckedASF != 0) {
      $.map(whichAS, function(p) {
        tableASM += `<th>${p}</th>`;
        tableASF += `<th>${p}</th>`;
      })} else if (numCheckedAS != 0 && numCheckedASM != 0 && numCheckedASF == 0) {
      $.map(whichAS, function(p) {
        tableASM += `<th>${p}</th>`;
      })} else if (numCheckedAS != 0 && numCheckedASM == 0 && numCheckedASF != 0) {
        $.map(whichAS, function(p) {
        tableASF += `<th>${p}</th>`;
    })};
  
    $.map(whichState, function(k) {
      tableStates1 += `<tr><th>${k}</th></tr>`;
      tableStates2 += `<tr><th>${k}</th></tr>`;
      tableStates3 += `<tr><th>${k}</th></tr>`;
      tableStates4 += `<tr><th>${k}</th></tr>`;
      tableStates5 += `<tr><th>${k}</th></tr>`;
    });
    $.map(whichRace, function(n) {
      tableRaces += `<th>${n}</th>`;
    });
    $.map(whichSizes, function(u) {
      tableSizes += `<th>${u}</th>`;
    });
    $.map(whichASM, function(y) {
      tableASM += `<th>${y}</th>`;
    });
    $.map(whichASF, function(z) {
      tableASF += `<th>${z}</th>`;
    });
    $.map(whichHousehold, function(w) {
      tableHousehold += `<th>${w}</th>`;
    });


    tableRaces += `</tr>`;
    tableSizes += `</tr>`;
    tableASM += `</tr>`;
    tableASF += `</tr>`;
    tableHousehold += `</tr>`;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let numCheckedRacesSizes = (numCheckedRaces + numCheckedSizes);
    let numCheckedRacesSizesAS = (numCheckedRacesSizes + numCheckedAS);
    let numCheckedRacesSizesASASM = (numCheckedRacesSizesAS + numCheckedASM);
    let numCheckedRacesSizesASASMASF = (numCheckedRacesSizesASASM + numCheckedASF);

    for (let i = 1; i < responseJson.length; i++) {
      response = responseJson[i];
      racesValues.push(response.slice(0, numCheckedRaces))
      sizesValues.push(response.slice(numCheckedRaces, numCheckedRacesSizes))
      ASValues.push(response.slice(numCheckedRacesSizes, numCheckedRacesSizesAS));
      ASMValues.push(response.slice(numCheckedRacesSizesAS, numCheckedRacesSizesASASM));
      ASFValues.push(response.slice(numCheckedRacesSizesASASM, numCheckedRacesSizesASASMASF));
      householdValues.push(response.slice(numCheckedRacesSizesASASMASF, -1));
    };

    if (numCheckedAS != 0 && numCheckedASM != 0 && numCheckedASF != 0) {
      tableASM += `<tr><td>${numberWithCommas(ASValues)}</td>`
      tableASF += `<tr><td>${numberWithCommas(ASValues)}</td>`
    } else if (numCheckedAS != 0 && numCheckedASM != 0 && numCheckedASF == 0) {
      tableASM += `<tr><td>${numberWithCommas(ASValues)}</td>`
    } else if (numCheckedAS != 0 && numCheckedASM == 0 && numCheckedASF != 0) {
      tableASF += `<tr><td>${numberWithCommas(ASValues)}</td>`
    } else {
      tableASM += `<tr>`;
      tableASF += `<tr>`;
    }

    for (let i = 0; i < racesValues.length; i++) {
      tableRaces += `<tr>${racesValues[i].map(h => `<td>${numberWithCommas(h)}</td>`).join('')}</tr>`;
    }
    
    for (let i = 0; i < sizesValues.length; i++) {
      tableSizes += `<tr>${sizesValues[i].map(p => `<td>${numberWithCommas(p)}</td>`).join('')}</tr>`;
    }

    for (let i = 0; i < ASMValues.length; i++) {
      tableASM += `${ASMValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
    }

    for (let i = 0; i < ASFValues.length; i++) {
      tableASF += `${ASFValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
    }

    for (let i = 0; i < householdValues.length; i++) {
      tableHousehold += `<tr>${householdValues[i].map(r => `<td>${numberWithCommas(r)}</td>`).join('')}</tr>`;
    }
  
    tableRaces += `</table>`;
    tableStates1 += `</table>`;
    tableStates2 += `</table>`;
    tableStates3 += `</table>`;
    tableStates4 += `</table>`;
    tableStates5 += `</table>`;
    tableSizes += `</table>`;
    tableASM += `</table>`;
    tableASF += `</table>`;
    tableHousehold += `</table>`;

    console.log(responseJson);
    console.log(response);
    console.log(racesValues);
    console.log(ASValues);
    console.log(ASMValues);
    console.log(ASFValues);
    console.log(householdValues);
    console.log(tableRaces);
    console.log(tableStates1);
    console.log(tableStates2);
    console.log(tableStates3);
    console.log(tableStates4);
    console.log(tableStates5);
    console.log(tableSizes);
    console.log(tableASM);
    console.log(tableASF);
    console.log(tableHousehold);

    if (numCheckedRaces != 0) {
      $('.resultsContainer1').show();
    } else {
      $('.resultsContainer1').hide();
    }

    if (numCheckedSizes != 0) {
      $('.resultsContainer2').show();
    } else {
      $('.resultsContainer2').hide()
    }
    
    if (numCheckedASM != 0) {
      $('.resultsContainer3').show();
    } else {
      $('.resultsContainer3').hide()
    }

    if (numCheckedASF != 0) {
      $('.resultsContainer4').show();
    } else {
      $('.resultsContainer4').hide()
    }

    if (numCheckedHousehold != 0) {
      $('.resultsContainer5').show();
    } else {
      $('.resultsContainer5').hide()
    }

    $('.resultsRaces').append(tableRaces);
    $('.resultsStates1').append(tableStates1);
    $('.resultsStates2').append(tableStates2);
    $('.resultsStates3').append(tableStates3);
    $('.resultsStates4').append(tableStates4);
    $('.resultsStates5').append(tableStates5);
    $('.resultsSizes').append(tableSizes);
    $('.resultsASM').append(tableASM);
    $('.resultsASF').append(tableASF);
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