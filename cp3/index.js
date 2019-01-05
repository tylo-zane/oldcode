/*
* Name: Tyler Marcinyshyn
* Date: October 24, 2018
* Section: CSE 154 AF
* This index.js provides functionality to the Pokémon Deck Builder. It sends the user's input
* to the Pokemon TCG API and returns trading cards based on this input.
*/

(function() {
  "use strict";
  const POKE_URL = "https://api.pokemontcg.io/v1/";

  window.addEventListener("load", initialize);

 /**
  * Initializes the webpage by adding event listeners to each input area.
  */
  function initialize() {
    sayHello();
    $("enter-btn").addEventListener("click", getInput);
    $("enter-btn").click(); // so default cards appear on the page after it is loaded
    $("text-entry").addEventListener("keyup", function(event) {
      if (event.key !== "Enter") {
        return;
      } else {
        $("enter-btn").click();
      }
    });
  }

 /**
  * Sets the speech bubble so the user knows how to add cards to their deck.
  */
  function sayHello() {
    $("bubble").classList.remove("hidden");
    $("bubble").innerText = "Click on a card to add it to your deck!";
    setTimeout(clearMessage, 8000);
  }

 /**
  * Takes the input from the textbox, clears the box, and uses this input
  * to call AJAX.
  */
  function getInput() {
    let input = $("text-entry").value;
    while($("scroll-wrap").hasChildNodes()) {
      $("scroll-wrap").removeChild($("scroll-wrap").firstChild);
    }
    $("text-entry").value = "";
    callAjax(input);
  }

 /**
  * Combines the input with the API URL to access a specific part of the API.
  * @param {string} input - the input used to query the API
  */
  function callAjax(input){
    let url = POKE_URL + "cards?name=" + input;
    fetch(url, {mode: "cors"})
      .then(checkStatus)
      .then(JSON.parse)
      .then(addCards)
      .catch(catchError);
  }

 /**
  * Adds cards to the page that match the query value that was given.
  * @param {string} response - the JSON object retrieved from the API
  */
  function addCards(response){
    if (response.cards.length < 1) {
      noResults();
    }
    for (let i = 0; i < response.cards.length; i++) {
      let card = document.createElement("div");
      card.classList.add("card");
      let image = document.createElement("img");
      image.src = response.cards[i]["imageUrl"];
      image.alt = response.cards[i]["name"];
      card.appendChild(image);
      card.addEventListener("click", addToDeck);
      $("scroll-wrap").appendChild(card);
    }
  }

 /**
  * Adds the card which was clicked on to the "My Deck" section of the page.
  */
  function addToDeck(){
    let copy = this.cloneNode(true);
    copy.removeEventListener("click", addToDeck);
    let number = parseInt($("count").innerText);
    number++;
    $("count").innerText = number + "/60";
    copy.classList.remove("card");
    copy.classList.add("small");
    copy.addEventListener("click", removeFromDeck);
    $("deck").appendChild(copy);
  }

 /**
  * Removes cards that are clicked on from the "My Deck" section of the page.
  */
  function removeFromDeck() {
    let number = parseInt($("count").innerText);
    number--;
    $("count").innerText = number + "/60";
    this.remove();
  }

 /**
  * The speech bubble communicates the fetch error to the user.
  * @param {object} error - The error to be displayed
  */
  function catchError(error) {
    $("bubble").classList.remove("hidden");
    $("bubble").innerText = error;
    setTimeout(clearMessage, 8000);
  }

 /**
  * Sets the speech bubble to tell the player that no results were returned.
  */
  function noResults() {
    $("bubble").classList.remove("hidden");
    $("bubble").innerText = "That search returned no results!";
    setTimeout(clearMessage, 8000);
  }

 /**
  * Hides Jigglypuff's speech bubble.
  */
  function clearMessage() {
      $("bubble").classList.add("hidden");
      $("bubble").innerText = "";
  }

 /**
  * Helper function. If there are no errors, returns the response text. Otherwise
  * returns the rejected Promise result with an error status.
  * @param {object} response - response to check for error
  * @return {object} - If no errors, returns validated result text. Otherwise returns
  *                    the rejected Promise result
  */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

 /**
  * Helper function. Returns an element based on its ID.
  * @param {string} id - the id of the element
  * @returns {object} - the element selected by its id
  */
  function $(id) {
    return document.getElementById(id);
  }

})();
