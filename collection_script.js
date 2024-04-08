document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.dynamic-img');

    images.forEach(function(img) {
        var baseSrc = img.getAttribute('data-src');
        // You can replace 'mobile-card-id' and 'desktop-card-id' with actual logic to determine the correct image ID
        if (window.innerWidth <= 480) { // For mobile devices
            img.src = baseSrc.replace('{id}', 'mobile-card-id');
        } else {
            img.src = baseSrc.replace('{id}', 'desktop-card-id');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var img = entry.target;
                var baseSrc = img.getAttribute('data-src');
                img.src = baseSrc.replace('{id}', 'appropriate-card-id');
                observer.unobserve(img);
            }
        });
    });

    var images = document.querySelectorAll('.dynamic-img');
    images.forEach(img => observer.observe(img));
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filterButton').addEventListener('click', function() {
        window.location.href = 'filter.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Assuming all card images have a class 'dynamic-img'
  var imgs = document.querySelectorAll('.dynamic-img');
  var modal = document.getElementById('cardModal');
  var modalContent = document.getElementById('modalCardDetails');
  var span = document.getElementsByClassName("close")[0];

  imgs.forEach(img => {
      img.addEventListener('click', function() {
          var cardDetailsHTML = `<!DOCTYPE html>
          <html lang="en">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Belle Strange but Special</title>
          <link rel="stylesheet" href="card_info_style.css">
          </head>
          <body>
            <script src="card_info_script.js"></script>
          
            <div id="cardDetailsContainer"></div>
            <div class="filter-header">
              <button class="back-button" onclick="location.href='collection.html'">Back</button>
            </div>
            <div class="card-container">
              <div class="card-header" id="cardName">Belle Strange but Special</div>
              <img src="CardImage" alt="card-image" class="card-image" id="cardImage">
              <div class="card-classifications" id="cardClassifications">
                  Classifications: Storyborn - Hero - Princess
              </div>
              <div class="card-attributes" id="cardAttributes">
                  Strength: 2 <br>
                  Willpower: 4 <br>
                  Lore: 1
              </div>
              <div class="card-lore" id="cardLore">
                  Set: The First Chapter <br>
                  Number: 142 <br>
                  Rarity: Legendary
              </div>
              <div class="card-text" id="cardText">
                  Card Text: <br>
                  Read a Book: During your turn, you may put an additional card from your hand into your inkwell facedown. <br>
                  My Favorite Part!: While you have 10 or more cards in your inkwell, this character gets +4 lore.
              </div>
              
                  </div>
                </div>
                <div class="nav-bar">
                  <div class="nav-item">
                      <div class="nav-icon home-icon"></div>
                      Home
                  </div>
                  <div class="nav-item">
                      <div class="nav-icon search-icon"></div>
                      Search
                  </div>
                  <div class="nav-item">
                      <div class="nav-icon collection-icon"></div>
                      Collection
                  </div>
                  <div class="nav-item">
                      <div class="nav-icon decks-icon"></div>
                      Decks
                  </div>
                  <div class="nav-item">
                      <div class="nav-icon scan-icon"></div>
                      Scan
                  </div>
              </div>
              <script>document.addEventListener('DOMContentLoaded', function() {
                // Your JavaScript code here
                fetchAndDisplayCard();
              });
              </script>
            </body>
          </html>
          `;
          // Populate the modal with card details
          modalContent.innerHTML = cardDetailsHTML;
          // Display the modal
          modal.style.display = "block";
      });
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});