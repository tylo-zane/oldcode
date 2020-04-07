(function() {
   "use strict";

   const POKE_URL = "https://api.pokemontcg.io/v1/"; // link to the API

   let app = { // data object representing the app's current state
      tentative: [], // array of cards which will be tentatively added to the current deck
      currentDeck: "", // represents deck that is currently being edited
      currentView: "",
      deckMetaData: [
         {
         'name': "Terraki-Mewtwo",
         'image': "image/mew.png",
         'type1': "psychic",
         'type2': "ground"
         },
         {
         'name': "Bright_Aura",
         'image': "image/lapras.png",
         'type1': "water",
         'type2': "fairy"
         },
         {
         'name': "No_Surprises",
         'image': "image/dragonite.png",
         'type1': "dragon",
         'type2': "grass"
         },
         {
         'name': "Intimidation",
         'image': "image/jiggly.png",
         'type1': "fairy",
         'type2': "electric"
         }]
   };

   $(window).on("load", initialize);

  /**
   * Initializes the webpage by adding event listeners to each area of input.
   * Retrieves existing app data from local storage.
   */
   function initialize() {
      if (localStorage.getItem("appData") !== null) {
         app = JSON.parse(localStorage.getItem("appData"));
      }
      indexView();
      renderDeckIcons();
      console.log(app);
      $("#enter-btn").on("click", getInput);
      $("#done-btn").on("click", confirmNewCards);
      $("#cancel-btn").on("click", cancelNewCards);
      $(".edit").on("click", addView);
      $(".view-btn").on("click", deckView);
      $('#back-btn').on("click", () => {
         toggleButtons();
         indexView();
      });
      $("#search-input").on("keyup", function(event) {
         if (event.key !== "Enter") {
            return;
         } else {
            $("#enter-btn").click();
         }
      });
   }

  /**
   * Retrieves input from text area. Clears the right panel of cards.
   */
   function getInput() {
      if (app.currentView === "addView") {
         hideWarning();
         let input = $("#search-input").val();
         $('#right-panel .card').remove();
         $("#search-input").val('')
         startFetch(input);
      }
   }

  /**
   * Makes a request to the Pokémon Card Game API based on the user's input.
   * @param {string} input - The term to query the database with
   */
   function startFetch(input) {
      $("#loading-symbol").toggleClass('hidden');
      let url = POKE_URL + "cards?name=" + input;
      fetch(url, {mode: "cors"})
         .then(response => {
            let promise = response.json();
            return promise;
         })
         .then(showSearchResults)
         .catch(showWarning);
   }

  /**
   * Generates cards based on the AJAX request. Appends cards to the right-panel.
   * @param {object} response - JSON object containing card information
   */
   function showSearchResults(response) {
      toggleLoading();
      if (response.cards.length < 1) {
         showWarning("There are no results!");
      }
      $("#result-count").text("Showing " + response.cards.length + " results.");
      for (let i = 0; i < response.cards.length; i++) {
         let cardData = generateCardData(response.cards[i]);
         let card = renderCard(cardData);
         card.on("click", function() {
            addToDeck(cardData, card);
         });
         $(".container").append(card);
      }
   }

  /**
   * Adds a card from the right-panel to the user's tentative deck.
   * @param {object} cardData - data object representing the specific card
   * @param {DOM element} cardElement - element representing the card
   */
   function addToDeck(cardData, cardElement) {
      let copy = cardElement.clone();
      app.tentative.push(cardData);
      copy.on("click", function() {
         removeFromDeck(cardData, copy);
      });
      $("#left-panel").append(copy);
   }

  /**
   * Removes a card from the user's tentative deck (located in the left-panel).
   * @param {object} cardData - data object representing the specific card to remove
   * @param {DOM element} cardElement - element representing the card
   */
   function removeFromDeck(cardData, cardElement) {
      cardElement.remove();
      let index = app.tentative.findIndex(card => {
         return card.image === cardData.image;
      });
      app.tentative.splice(index, 1);
   }

  /**
   * Finalizes changes the user has made to a deck. Updates app data with new deck.
   */
   function confirmNewCards() {
      app[app.currentDeck] = Object.assign([], app.tentative);
      app.tentative = [];
      localStorage.setItem("appData", JSON.stringify(app));
      indexView();
   }

  /**
   * Rejects all changes made to the user's tentative deck, keeping the deck in its
   * most recently saved form.
   */
   function cancelNewCards() {
      app.tentative = [];
      indexView();
   }

  /**
   * Switches application to 'Home Page' view. This displays all of the user's decks.
   */
   function indexView() {
      app.currentView = "indexView";
      $('.card').remove();
      hideWarning();
      $("h2").text('Home');
      $('#search-input').attr('placeholder', 'Search for a deck...');
      $("body").attr('id', 'full'); // the 'full' id hides the left-panel and repositions elements accordingly
   }

  /**
   * Switches application to 'Deck Edit' view.
   */
   function addView() {
      app.currentView = "addView";
      $('#search-input').attr('placeholder', "Search for a card to add...");
      $("body").attr('id', '');
      app.currentDeck = $(this).parent().attr('id');
      $("h2").text(app.currentDeck.replace("_", " "));
      if (app[app.currentDeck] && app[app.currentDeck].length != 0) {
         app.tentative = Object.assign([], app[app.currentDeck]);
         app[app.currentDeck].forEach(cardData => {
            let card = renderCard(cardData);
            card.on("click", function() {
               removeFromDeck(cardData, card);
            });
            $("#left-panel").append(card);
         });
      }
      $("#enter-btn").click(); // so default cards appear on the page after it is loaded
   }

  /**
   * Switches application to 'Deck View' mode, where the cards of a selected deck are displayed.
   */
   function deckView() {
      app.currentView = "deckView";
      app.currentDeck = $(this).parent().attr('id');
      toggleButtons();
      $("h2").text(app.currentDeck.replace("_", " "));
      if (!app[app.currentDeck] || app[app.currentDeck].length < 1) {
         showWarning("There are no cards to display!");
      } else {
         app[app.currentDeck].forEach(cardData => {
            let card = renderCard(cardData);
            $('#right-panel').append(card);
         });
      }
   }

  /**
   * Helper function. Toggles visibility of buttons when switching between Index View
   * and Deck View.
   */
   function toggleButtons() {
      $('#back-btn').toggleClass("hidden");
      $('#new-deck').toggleClass("hidden");
      $('.deck-container').toggleClass('hidden');
      $('#right-panel').toggleClass('deck-view');
   }

  /**
   * Helper function. Creates a DOM Element representation of a card's data.
   * @param {object} cardData - data object representing the card to render
   * @returns {DOM element} card - the rendered element
   */
   function renderCard(cardData) {
      let card = $("<img>");
      card.attr('src', cardData.image);
      card.attr('alt', cardData.name);
      card.addClass('card');
      return card;
   }

  /**
   * Helper function. Creates a data object given JSON information about a card.
   * @param {object} JSON - JSON to be read and converted to a data object
   * @returns {object} cardData - data object representing a specific card
   */
   function generateCardData(JSON) {
      let cardData = new Object();
      cardData.name = JSON["name"];
      cardData.image = JSON["imageUrl"];
      if (JSON.types) {
         cardData.types = JSON["types"].toString();
      }
      cardData.supertype = JSON["supertype"];
      return cardData;
   }

  /**
   * Renders deck icons based on decks stored within the app data.
   */
   function renderDeckIcons() {
      $('.deck-icon').remove();
      app.deckMetaData.forEach(deckData => {
         let deck = $('<div></div>');
         deck.addClass("deck-icon");
         deck.attr('id', deckData.name);
         let header = renderHeader(deckData);
         let heading = $('<h4>' + deckData.name.replace('_', ' ') + '</h4>');
         let image = renderDeckImage(deckData);
         let viewBtn = renderViewBtn();
         let editBtn = renderEditBtn();
         deck.append(header, heading, image, viewBtn, editBtn);
         $('.deck-container').append(deck);
      });

     /**
      * Renders the preview card of a deck icon.
      * @param {object} deckData - data object representing specific deck
      * @returns {object} - image to be displayed on the deck icon
      */
      function renderDeckImage(deckData) {
         let image = $('<img>');
         image.attr('src', deckData.image);
         image.attr('alt', deckData.name);
         return image;
      }

     /**
      * Renders the header of a deck icon.
      * @param {object} deckData - data object representing specific deck
      * @returns {object} - the header element, containing type icons and a delete button
      */
      function renderHeader(deckData) {
         let header = $('<div></div>');
         header.addClass('deck-header');
         let type1 = renderTypeIcon('type1', deckData);
         let type2 = renderTypeIcon('type2', deckData);
         let deleteButton = renderDeleteBtn();
         header.append(type1, type2, deleteButton);
         return header;
      }

     /**
      * Renders the type icons of a deck.
      * @param {string} number - string to determine whether type1 or type2 is being generated
      * @param {object} deckData - data object representing specific deck
      * @returns {object} - the type icons corresponding to the deck
      */
      function renderTypeIcon(number, deckData) {
         let output = $('<img>');
         output.attr('src', 'image/type/' + deckData[number] + '.png');
         output.attr('alt', deckData.number);
         return output;
      }

     /**
      * Renders the delete button of a deck.
      * @returns {object} - the delete button for a specific deck icon
      */
      function renderDeleteBtn() {
         let deleteButton = $('<p></p>');
         deleteButton.text('✗');
         deleteButton.attr('role', 'button');
         deleteButton.addClass('delete-btn');
         return deleteButton;
      }

     /**
      * Renders the view button of a deck icon.
      * @returns {object} - the view button element
      */
      function renderViewBtn() {
         let output = $('<a></a>');
         output.text('View');
         output.attr('role', 'button');
         output.addClass('view-btn');
         return output;
      }

     /**
      * Renders the edit button of a deck icon.
      * @returns {object} - the edit button element
      */
      function renderEditBtn() {
         let output = $('<a></a>');
         output.text('Edit');
         output.attr('role', 'button');
         output.addClass('edit');
         return output;
      }
   }

  /**
   * Toggles visibility of the loading symbol.
   */
   function toggleLoading() {
      $("#loading-symbol").toggleClass('hidden');
   }

  /**
   * Displays a warning message in the right panel
   * @param {string} warning - message to display to the user
   */
   function showWarning(warning) {
      if (!$("#loading-symbol").hasClass('hidden')) {
         toggleLoading();
      }
      let message = $(".warning");
      message.text(warning);
      message.removeClass("hidden");
   }

  /**
   * Hides warning message in the right panel.
   */
   function hideWarning() {
      if (!$(".warning").hasClass('hidden')) {
            $(".warning").addClass("hidden");
      }
   }

})();
