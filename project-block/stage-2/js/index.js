'use strict';

let state = {
	playerChoices: {},
	choiceCount: 1,
	gameResult: $(''),
	data: {}
};

// Handle AJAX Request 
fetch('./data/data.json').then((response) => {
	let data = response.json();
	return data;
})
.then((data) => {
	//Call function to create the html for the story
	state.data = data;
	makeStoryContent(data);
})
.catch((error) => {
	console.log(error);
	$('main').prepend(`<div class="alert alert-warning">There has been an error loading the page.</h1>`);
});

// Modal Images 
$('.screenshot').click((event) => {
	$('.modal').addClass('d-block');
	console.log(event.target);
	$('.modal-img').attr('src', $(event.target).attr('src'));
	$('.modal-img').addClass('d-block full-size');	
});
$('.close-cursor').click(() => {
	$('.modal').removeClass('d-block');
});

// Add mobile menu
let mobileNav = $(
	`<nav id="sidebar" class="text-right bg-dark mx-auto d-md-none">
        <ul class="list-unstyled components">
            <li class="active">
                <a href="index.html">Home</a>
            </li>
            <li>
                <a href="#">Your Prompts</a>
            </li>
            <li>
                <a href="#">Account</a>
            </li>
        </ul>
    </nav>`
	);
$('body').prepend(mobileNav);

// Mobile menu
$('#sidebar-collapse').click(() => {
	//make new nav appear
	$('#sidebar').toggleClass('active d-block');
});

// Handle button click that starts the game
$('.play-btn').click(() => {
	$('.home').addClass('d-none');
	$('.game').addClass('d-block');
	gameHandler();
	$('#story-1').addClass('d-block');
	$('#story-choice-1').addClass('d-block');
});

// Creates the story from the requested data
function makeStoryContent(data) {
	let gameDiv = $(
		`<div class="game w-70 mx-auto d-none">
			<div class="container p-auto mx-auto my-5">
		</div>
		`
	);

	$('.home').after(gameDiv);

	let keys = Object.keys(data.story);
	
	// Generate the paragraph containers 
	for(var i = 0; i < keys.length; i++) {
		let innerDiv = $(
			`<div class="col-xs"></div>`
			);
		$('.game').find('.container').append(innerDiv);
		let outerDiv = $(
			`<div class="row justify-content-center d-none"></div>`
			);
		outerDiv.attr('id', keys[i]);
		innerDiv.wrap(outerDiv);
	}

	// Generate the text paragraphs 
	for (var i = 0; i < keys.length; i++) {
		for (var j = 0; j < data.story[keys[i]].length; j++) {
			let p = $('<p>' + data.story[keys[i]][j] + '</p>');
			$('#' + keys[i]).append(p);
		}
	}

	// Access the choice data
	let choiceKeys = Object.keys(data.choices);
	// Generate the choice containers
	for (var i = 0; i < choiceKeys.length; i++) {
		let choiceDiv = $(
		`<div class="row choices d-none justify-content-center">
		</div>`
		);
		choiceDiv.attr('id', 'story-' + choiceKeys[i]);
		$('.game').find($('.container')).append(choiceDiv);
	}

	// Generate the choices FIX Choice ID
	for (var i = 0; i < choiceKeys.length; i++) {
		for (var j = 0; j < data.choices[choiceKeys[i]].length; j++) {
			let p = $('<p>' + data.choices[choiceKeys[i]][j] + '</p>');
			p.attr('class', 'choice');
			p.attr('id', "choice-" + state.choiceCount);
			state.choiceCount++;
			$('#story-' + choiceKeys[i]).append(p);
		}
	}
}

// Generates random hex code
function generateHex() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Removes past text and updates game based on choice
function makeChoice(storyNum, choiceNum) {
	$('#story-' + storyNum).addClass('d-none');
	$('#story-choice-' + storyNum).addClass('d-none');
	$('#story-' + storyNum).removeClass('d-block');
	$('#story-choice-' + storyNum).removeClass('d-block');
	if(choiceNum == 0) {
		endResult();
	} else {
		$('#story-' + choiceNum).addClass('d-block');
		$('#story-choice-' + choiceNum).addClass('d-block');
	}
}

function gameHandler() {
	//Choice selections and adding them to state
	// Choice 1 - The Beginning
	$('#choice-1').click(() => {
		state.playerChoices.choiceOne = 1;
		makeChoice(1, 2);
	});
	$('#choice-2').click(() => {
		state.playerChoices.choiceOne = 2;
		makeChoice(1, 0);
	});
	$('#choice-3').click(() => {
		state.playerChoices.choiceTwo = 1;
		makeChoice(2, 4);
	});
	$('#choice-4').click(() => {
		state.playerChoices.choiceTwo = 2;
		makeChoice(2, 3);
	});
	$('#choice-5').click(() => {
		state.playerChoices.choiceThree = 1;
		makeChoice(3, 0);
	});
	$('#choice-6').click(() => {
		state.playerChoices.choiceThree = 2;
		makeChoice(3, 0);
	});
	$('#choice-7').click(() => {
		state.playerChoices.choiceFour = 1;
		makeChoice(4, 0);
	});
	$('#choice-8').click(() => {
		state.playerChoices.choiceFour = 2;
		makeChoice(4, 0);
	});
}

function makePalette() {
	let colorDiv = $(
		`<div class="w-50 h-25 mx-auto"></div>`
		);
	for (var i = 0; i < 5; i++) {
		let colorBlock = $(
			`<div class="palette"></div>`
			);
		colorBlock.css("background-color", generateHex());
		colorDiv.append(colorBlock);
	}
	return colorDiv;
}

// Gets ending based on the one passed in
function getEndingText(ending) {
	let endP = '';
	for (var i = 0; i < state.data.story[ending].length; i++) {
		endP += '<p>' + state.data.story[ending][i] + '</p>'; 
	}
	return endP;
}

// Create the palette and prompt result page
function endResult() {
	let resultDiv = $(
		`<div class="result w-70 mx-auto d-none">
			<div class="container p-auto mx-auto my-5">
		</div>
		`
	);
	$('main').append(resultDiv);
	$('.game').removeClass('d-block');
	$('.result').removeClass('d-none');

	// Add choicethree === 2
	if(state.playerChoices.choiceOne === 2) {
		state.gameResult = $(
			'<h2>The End</h2>' +
			getEndingText("ending-2") +
			'<h2>Palette</h2>'	
		);
	}
	if (state.playerChoices.choiceThree === 1 || state.playerChoices.choiceFour === 1) {
		state.gameResult = $(
			'<h2>The End</h2>' +
			getEndingText("ending-1") +
			'<h2>Palette</h2>'
		);
	}
	if (state.playerChoices.choiceThree === 2) {
		state.gameResult = $(
			'<h2>The End</h2>' +
			getEndingText("ending-4") +
			'<h2>Palette</h2>'
		);
	}
	if (state.playerChoices.choiceFour === 2) {
		state.gameResult = $(
			'<h2>The End</h2>' +
			getEndingText("ending-3") +
			'<h2>Palette</h2>'
		);
	}
	let resultPalette = makePalette();
	$('.result').find($('.container')).append(state.gameResult);
	$('.result').find($('.container')).append(resultPalette);
}