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

  console.log(stateid);
  console.log(whichstate);

  let checkedrace = [];
  whichrace = [];
  $('input[name=race]:checked').each(function () {
    checkedrace.push($(this).val());
    whichrace.push($(this).attr("id"));
  });
  let raceid = checkedrace.join(",");
  let raceArray = checkedrace.join(", ");

  console.log(raceid)
  console.log(whichrace);

  numCheckedStates = $('input[name=state]:checked').length;
  numCheckedRaces = $('input[name=race]:checked').length;

  let url = `${endpoint}get=${raceid}&for=state:${stateid}&key=${APIKey}`
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
  $('.results').empty();
  console.log(responseJson);
  console.log(responseJson[1][0]);
  //  const headings = responseJson[0];
  //  console.log(headings);
  //  let table = `<table><tr>${headings.map(h => `<th>${h}</th>`).join('')}</tr>`
  //  console.log(table);
  let table = `<table>`;
  let data1 = [];
  for (let i = 1; i < responseJson.length; i++) {
    table += `<tr>${responseJson[i].map(h => `<th>${h}</th>`).join('')}</tr>`
    data1.push(responseJson[i]);
  };
  table += `</table>`
//  console.log(table);
  $('.results').append(table);

  console.log(data1);

  console.log(numCheckedStates);
  console.log(numCheckedRaces);

  let x1 = [];
  for (let i = 0; i < data1[0].length; i++) {
    x1.push(data1[0][i]);
    x11 = x1.slice(0, -1);
  }

  let x2 = [];
  for (i in data1[1]) {
    x2.push(data1[1][i]);
    x21 = x2.slice(0, -1);
  }

  let x3 = [];
  for (i in data1[2]) {
    x3.push(data1[2][i]);
    x31 = x3.slice(0, -1);
  }

  console.log(data1[0][0]);
  console.log(x1);
  console.log(x2);
  console.log(x11);
  //console.log(${x21});
  //console.log(${x31});

  $('.results2').html(`
    ${whichstate}<br>
    ${whichrace}<br>
    ${x11}<br>
    ${x21}<br>
    ${x31}
    `);

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