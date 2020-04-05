(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    window.addEventListener('resize', initCarousel);
  });

 /**
  * Initializes the Materialize Carousel
  */
  function initCarousel() {
    removeIndicators();
    let elems = document.querySelectorAll('.carousel'),
      onCycleTo = function (ele) {
        updateText(ele.id);
      },
      instances = M.Carousel.init(elems, {
        indicators: true,
        onCycleTo: onCycleTo
      });
  }

 /**
  * Updates displayed text based on the index of the carousel.
  * @param {string} index - an ID representing the index of the carousel
  */
  function updateText(index) {
    let skills = document.getElementById('skills');
    let desc = document.getElementById('desc');
    let extraDesc = document.getElementById('desc-2');
    let link = document.getElementById('view-code');
    if (index == 'slide1') {
      skills.innerText = 'HTML, JavaScript, PHP, CSS, Illustration';
      desc.innerText = "Originally created for CSE 154 as an exercise in PHP programming. " +
                       "Conversation Parade is an experimental game allowing you to engage " +
                       "in discussions with Apathy, the cartoon cat. " +
                       "He will respond in different manners depending on the text you input. " +
                       "Using the 'emote' buttons in the lower right corner, you can " +
                       "even communicate with Apathy how he has made you feel.";
      hideElement(extraDesc);
      link.href = "https://github.com/tylo-zane/portfolio/tree/master/convo-parade";
    } else if (index == 'slide2') {
      skills.innerText = 'HTML, JavaScript, React, Firebase';
      desc.innerText = "Block is a choose-your-own adventure " +
                       "game with the goal of helping artists work through their artist's " +
                       "block. Using the account creation services provided by Firebase, users " +
                       "can register with the site and publish their own stories for others " +
                       "to play. Completion of a story awards players with prompts to " +
                       "assist them in creating art.";
      extraDesc.classList.remove('hidden');
      extraDesc.innerText = "Contributions to this team-based project include UI for " +
                            "the 'Story Select' Screen, account creation features, " +
                            "and all interactions between with the server-side database.";
      link.href = "https://github.com/tylo-zane/portfolio/tree/master/project-block";
    } else if (index == 'slide3') {
      skills.innerText = 'HTML, JavaScript, JQuery, CSS, Responsive Design';
      desc.innerText = "The Pokémon Deck Builder " +
                       "lets you search a complete database of Pokémon Trading Cards " +
                       "to discover the perfect 'Mon for your dream deck. " +
                       "You can move cards to and from your virtual deck simply by clicking " +
                       "upon them. However, because the Deck Builder is a " +
                       "work-in-progress, save slots are fixed to preset names and " +
                       "preview images.";
      hideElement(extraDesc);
      link.href = "https://github.com/tylo-zane/portfolio/tree/master/deck-builder";
    }
  }

 /**
  * Hides the given DOM element
  * @param {array} el - the DOM element to hide
  */
  function hideElement(el) {
    if (!el.classList.contains("hidden")) {
       el.classList.add("hidden");
    }
  }

 /**
  * Removes all instances of carousel indicators
  */
  function removeIndicators() {
    let indic = document.querySelectorAll('.indicators');
    if (indic) {
      indic.forEach(el => el.remove());
    }
  }

})();
