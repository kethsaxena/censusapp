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

  let checkedrace = [];
  $('input[name=race]:checked').each(function () {
    checkedrace.push($(this).val());
  });
  console.log();
  let raceid = checkedrace.join(",");

  let checkedstate = [];
  $('input[name=state]:checked').each(function () {
    checkedstate.push($(this).val());
  });
  let stateid = checkedstate.join(",");

  numCheckedStates = $('input[name=state]:checked').length + 1;
  numCheckedRaces = $('input[name=race]:checked').length + 1;

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
  const headings = responseJson[0];
  console.log(headings);
  //  let table = `<table><tr>${headings.map(h => `<th>${h}</th>`).join('')}</tr>`
  //  console.log(table);
  let table = "<table>";
  let data1 = [];
  for (let i = 0; i < responseJson.length; i++) {
    table += `<tr>${responseJson[i].map(h => `<th>${h}</th>`).join('')}</tr>`
    data1.push(`${responseJson[i]}`);
  };
  table += `</table>`
  console.log(table);
  $('.results').append(table);

  console.log(data1);

  console.log(numCheckedStates);
  console.log(numCheckedRaces);

  for (i = 0; i < data1.length; i++) {
    console.log(data1[i]);
  }
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
