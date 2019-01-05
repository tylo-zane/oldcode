/*
* Name: Tyler Marcinyshyn
* Date: October 11, 2018
* Section: CSE 154 AF
* This index.js implements the behavior of the Velvet Bar webpage so that it responds to
* the user's input. Customers will leave or stay based on how the user treats them.
*/

(function() {
	"use strict";
	window.addEventListener("load", initialize);
	let timer1 = null;
	let timer2 = null;
	let timer3 = null;
	
	/** 
	 * Helper function. Returns an element based on its ID.
	 * @param {string} id - the id of the element
	 * @returns {Object} - the element selected by its id
	*/
	function $(id) {
		return document.getElementById(id);
	}
	
	/**
	 * Listens for the the 'Enter' button being pressed. Calls helper functions to
	 * set each customer's dialogue and time until getting upset.
	*/
	function initialize() {
		$("enter-btn").addEventListener("click", enterCommand);
		$("text-entry").addEventListener("keyup", function(event) {
			if (event.key !== "Enter") {
			return;
			} else {
			$("enter-btn").click();
			}
		});
		setTimes();
		everyoneTalk();
	}
	
	/**
	 * Reads the input from the text box and decides how to react based on input.
	 * Adds text nodes to the game's log to describe happenings.
	*/
	function enterCommand() {
		let command = $("text-entry").value;
		let para = document.createElement("p");
		let node = document.createTextNode("");
		para.appendChild(node);
		if (command.includes("help")) {
			node.nodeValue = "You are the owner of the renowned Velvet Bar, and customers are \
			rolling in non-stop. To serve them, type the name of a drink. \
			There are even some hidden commands to discover.";
		} else if (command.includes("look")) {
			node.nodeValue = "You look around the Velvet Bar. Somebody REALLY cool must have \
			designed this place.";
		} else if (command.includes("run") || command.includes("go") ||
					command.includes("leave"))		{
			node.nodeValue = "You can't leave! You're working a shift, silly.";
		} else if (command === "scream" || command === "yell" || command === "shout") {
			node.nodeValue = "Since it's almost Halloween, everybody " + command +"s with you.";
		} else if (command === "sake" || command === "milk" || command === "water" ||
					command === "juice" || command === "tea" || command === "coffee" ||
					command === "cola") {
			node.nodeValue = checkAnswer(command);
		} else {
			node.nodeValue = "I'm sorry, I don't understand the phrase '" + command + "'.";
		}
		$("game-log").insertBefore(para, $("game-log").firstChild);
		$("text-entry").value = "";
	}
	
	/**
	 * Helper function. Sets all customers' time until they get upset.
	*/
	function setTimes(){
		timer1 = setTimeout(getAngry, 20000, $("char1"));
		timer2 = setTimeout(getAngry, 20000, $("char2"));
		timer3 = setTimeout(getAngry, 20000, $("char3"));
	}
	
	/**
	 * Adds a node to the game's log and replaces a customer after they have waited for too long.
	 * @param {Object} x - customer who has waited for too long
	*/
	function getAngry(x) {
		newCustomer(x);
		let message = document.createElement("p");
		let node = document.createTextNode("A customer waited for too long and left the bar!");
		message.appendChild(node);
		$("game-log").insertBefore(message, $("game-log").firstChild);
	}
	
	/**
	 * Creates a new customer by randomly choosing an image. Calls helper functions to set the
	 * customer's dialogue and time until getting angry.
	 * @param {Object} x - customer to be replaced
	*/
	function newCustomer(x) {
		let rando = Math.floor(Math.random() * 4);
		if (rando === 0) {
			x.src = 'images/apathy.png';
		} else if (rando === 1) {
			x.src = 'images/vanity.png';
		} else if (rando === 2) {
			x.src = 'images/fortune.png';
		} else if (rando === 3) {
			x.src = 'images/sin.png';
		}
		if (x === $("char1")) {
			charTalk($("bubble1"));
			clearTimeout(timer1); 
			timer1 = setTimeout(getAngry, 10000, x);
		} else if (x === $("char2")) {
			charTalk($("bubble2"));
			clearTimeout(timer2); 
			timer2 = setTimeout(getAngry, 10000, x);
		} else if (x === $("char3")) {
			charTalk($("bubble3"));
			clearTimeout(timer3); 
			timer3 = setTimeout(getAngry, 10000, x);
		}
	}
	
	
	/** Helper function. Sets new dialogue for all customers. */
	function everyoneTalk() {
		charTalk($("bubble1"));
		charTalk($("bubble2"));
		charTalk($("bubble3"));
	}
	
	/** 
	 * Adds a negative or positive reaction to the game's log based on input given by the player.
	 * @param {string} input - the input provided by the player
	 * @returns {string} - message which is positive or negative based on how the player did
	*/
	function checkAnswer(input) {
		let correct = 0;
		if ($("bubble1").firstChild.innerText.includes(input)) {
			charTalk($("bubble1"));
			newCustomer($("char1"));
			correct = 1;
		}
		if ($("bubble2").firstChild.innerText.includes(input)) {
			charTalk($("bubble2"));
			newCustomer($("char2"));
			correct = 1;
		}
		if ($("bubble3").firstChild.innerText.includes(input)) {
			charTalk($("bubble3"));
			newCustomer($("char3"));
			correct = 1;
		}
		if (correct === 1) {
			return("You served " + input + " to a customer.");
		} else {
			return("Nobody wanted " + input + "! You put it back...");
		}
	}
	
	/**
	 * Generates new dialogue in the speech bubble of a character.
	 * @param {Object} x - Speech bubble corresponding to a specific customer.
	*/
	function charTalk(x) {
		while (x.hasChildNodes()) {
			x.removeChild(x.lastChild);
		}
		let talk = document.createElement("p");
		let node = document.createTextNode("");
		let rando = Math.floor(Math.random() * 11);
		if (rando === 0) {
			node.nodeValue = "My craving can only be quenched by milk.";
		} else if (rando === 1) {
			node.nodeValue = "I am ridiculously deprived of juice.";
		} else if (rando === 2) {
			node.nodeValue = "Boy, I wish I had some sake right now.";
		} else if (rando === 3) {
			node.nodeValue = "Can I get some cola over here?";
		} else if (rando === 4) {
			node.nodeValue = "Zzz... Y'all have coffee?";
		} else if (rando === 5) {
			node.nodeValue = "ZzzZZ. I require my morning cup of tea; There is no better \
			way to start the day, says mum.";
		} else if (rando === 6) {
			node.nodeValue = "Some water should prove to be an incredible solution for my dry \
			mouth.";
		} else if (rando === 7) {
			node.nodeValue = "Mom asked me to pick up some milk before she'll let me back \
			into the house.";
		} else if (rando === 8) {
			node.nodeValue = "I have the most insane hankering for some tea.";
		} else if (rando === 9) {
			node.nodeValue = "There was no time to brew coffee before I left this morning!";
		} else if (rando === 10) {
			node.nodeValue = "I am in a desperate situation and the only way out is juice.";
		}
		node.class = "bubbletext";
		talk.appendChild(node);
		x.appendChild(talk);
	}

})();