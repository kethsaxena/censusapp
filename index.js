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



$(function () {
  watchForm();
  collapseExpand();
});