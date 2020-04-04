(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    window.addEventListener('resize', initCarousel);
  });

  function initCarousel() {
    let indic = document.querySelectorAll('.indicators');
    if (indic) {
      indic.forEach(el => el.remove());
    }
    let elems = document.querySelectorAll('.carousel'),
      onCycleTo = function (ele) {
        updateText(ele.id);
      },
      instances = M.Carousel.init(elems, {
        indicators: true,
        onCycleTo: onCycleTo
      });
  }

  function updateText(index) {
    let skills = document.getElementById('skills');
    let desc = document.getElementById('desc');
    let link = document.getElementById('view-code');
    if (index == 'slide1') {
      skills.innerText = 'HTML, JavaScript, PHP, CSS, Illustration';
      desc.innerText = "Originally created for CSE 154 as an exercise in PHP programming. " +
                       "Conversation Parade is an experimental game allowing you to engage " +
                       "in discussions with Apathy, the cartoon cat. " +
                       "He will respond in different manners depending on the text you input. " +
                       "Using the 'emote' buttons in the lower right corner, you can " +
                       "even communicate with Apathy how he has made you feel.";
      link.href = "https://github.com/tylo-zane/portfolio/tree/master/convo-parade";
    } else if (index == 'slide2') {
      skills.innerText = 'HTML, JavaScript, React, Firebase';
      desc.innerText = "A team-based project for INFO 340. Block is a choose-your-own adventure " +
                       "game with the goal of helping artists work through their creator's " +
                       "block. Using the account creation services provided by Firebase, users " +
                       "can register with the site and create their very own stories for others " +
                       "to play. Completion of a story awards the player with a prompt and color " +
                       "palette to assist them in making art.";
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
      link.href = "https://github.com/tylo-zane/portfolio/tree/master/deck-builder";
    }
  }

})();
