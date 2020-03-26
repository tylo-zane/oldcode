(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.carousel'),
      onCycleTo = function (ele) {
        updateText(ele.id);
      },
      instances = M.Carousel.init(elems, { indicators: true, onCycleTo: onCycleTo });
  });

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
      link.href = "https://courses.cs.washington.edu/courses/cse154/cp/18au/cp4/ocellus/index.html";
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
      skills.innerText = 'HTML, CSS, Illustration';
      desc.innerText = "An outdated development blog for my game project known as " +
                       '"Ephemeralness". ' + "While the game hasn't " +
                       "been updated since October of 2018, the website is still a joy " +
                       "to read (as well as something of a graphical marvel). " +
                       "As this is the first website I ever created, it holds a special " +
                       "place in my heart."
      link.href = "https://github.com/tylo-zane/portfolio/tree/master/dev-blog";
    } else if (index == 'slide5') {
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
