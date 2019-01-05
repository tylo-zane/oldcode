/*
* Name: Tyler Marcinyshyn
* Date: November 7, 2018
* Section: CSE 154 AF
* This index.js provides functionality to Conversation Parade. It sends the user's input
* to a PHP service. It retrieves and displays the response as a message from Apathy.
*/

(function() {
	"use strict";

	window.addEventListener("load", initialize);
	
    /**
	 * Initializes Conversation Parade by adding event listeners to every button.
     * Starts animation of the clouds and Apathy's mouth.
	 */
	function initialize() {
        $("enter-btn").addEventListener("click", enterCommand);
		$("text-entry").addEventListener("keyup", function(e) {
			if (e.key !== "Enter") {
                return;
			} else {
                $("enter-btn").click();
			}
		});
        $("happy").addEventListener("click", sendEmotes);
        $("angry").addEventListener("click", sendEmotes);
        $("somber").addEventListener("click", sendEmotes);
        setTimeout(moveClouds, 50, 0);
        animateMouth();
	}
    
    /**
	 * Takes a user's input and sends it to the PHP service. Clears the input box.
	 */
    function enterCommand() {
        let input = $("text-entry").value.toLowerCase();
        if (input.includes(" ")) {
            input = input.split(" ");
            input = input.toString();
        }
        if (input) {
            $("text-entry").value = "";
            let url = "index.php?command=" + input;
            let init = {method: "GET",
                mode: "cors",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                };
            fetch(url, init)
                .then(checkStatus)
                .then(JSON.parse)
                .then(showResult)
                .catch(console.log);
        }
	}
    
    /**
	 * Displays the phrase returned by PHP inside of Apathy's speech bubble.
	 * @param {object} response - the JSON object representing Apathy's spoken words
	 */
    function showResult(response) {
        if (response) {
            let rando = Math.floor(Math.random() * response.length);
            response = response[rando];
            qs(".message").remove();
            animateMouth();
            let para = document.createElement("p");
            para.innerText = response;
            let speech = para.cloneNode(true);
            speech.classList.add("message");
            $("log").insertBefore(para, $("log").firstChild);
            $("bubble").appendChild(speech);
        }
    }
    
    /**
	 * Takes the emotion chosen by the user and sends it to the PHP service.
	 */
    function sendEmotes() {
        let input = this.id;
        let url = "index.php?emote=" + input;
        let init = {method: "GET",
                mode: "cors",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                };
        fetch(url, init)
            .then(checkStatus)
            .then(emoteResult)
            .catch(console.log);
    }
    
    /**
	 * Displays the response retrieved from PHP inside of the conversation log.
	 * @param {string} response - the string returned based on the chosen emotion
	 */
    function emoteResult(response) {
        let para = document.createElement("p");
        para.innerText = response + ".";
        $("log").insertBefore(para, $("log").firstChild);
    }
    
    /**
	 * Moves the clouds by 1 pixel after a set interval of time.
	 * @param {integer} position - the x position (in pixels) of the cloud background
	 */
    function moveClouds(position) {
        position++;
        qs("main").style.backgroundPosition =  position + "px 0px";
        setTimeout(moveClouds, 50, position);
    }
    
    /**
	 * Makes Apathy's mouth animated for three seconds.
	 */
    function animateMouth() {
        $("apathy").src = "images/apathy2.gif";
        setTimeout(function() {
            $("apathy").src = "images/apathy.png";
        }, 3000);
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
    
    /**
	 * Helper function. Returns the first element of the given class.
	 * @param {string} clazz - the class of the element
	 * @returns {Object} - the element selected by its class
	 */
	function qs(clazz) {
		return document.querySelector(clazz);
	}
	
})();