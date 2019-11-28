
function buildCard() {
    // organize by state 
    $('.card-container').html(`<div class='card'>
        <h3>State name</h3>
        <section class='info-section gender'>
          <ul class='info-list'>
            <li class='info-item'>
              <p class='info-heading'>heading</p>
              <p class='info-data'>data</p>
            </li>
            <li class='info-item'>
              <p class='info-heading'>heading</p>
              <p class='info-data'>data</p>
            </li>
        </section>
      </div>`)
  } 


  buildCard();