<?php
error_reporting(E_ALL);

/*
 * Name: Tyler Marcinyshyn
 * Date: November 7, 2018
 * Section: CSE 154 AF
 * This index.php takes the user's input and matches a string or a subset from the JSON data
 * based on this input.
 *
 * Required GET parameters (limit to ONE of the following):
 * -command 
 * -emote
 * Output formats:
 * -command requests return JSON
 * -emote requests return plain text
 * Output details:
 * -If the command parameter is passed, returns a JSON list of phrases which correspond to the
 *  given command (This simulates a "conversation" of sorts).
 * -If the emote parameter is passed, returns a string which tells the player that Apathy has
 *  been informed of their feelings.
 * -If no parameters are provided, outputs 400 error message as plain text
*/

$responses = file_get_contents("data.json");
$responses = json_decode($responses);

if (isset($_GET["command"])) {
    $command = $_GET["command"];
    $command = explode(",", $command);
    handle_command($command, $responses);
} else if (isset($_GET["emote"])) {
    $emote = $_GET["emote"];
    handle_emote($emote);
} else {
    header("HTTP/1.1 400 Invalid Request");
    die("Error: No input has been provided.");
}

/**
 * Handles the "command=" GET request. Compares the command provided by the user to
 * commands listed in the JSON data. If there's a match, a list of phrases corresponding
 * to the command is returned. If there is no match, a list of random phrases is
 * returned. Output is in JSON format.
 * @param {array} $command - the command inputted by the user
 * @param {object} $responses - the JSON object of phrases
 * @returns {string} - JSON list of phrases, refined based on user input
 */
function handle_command($command, $responses) {
    $found = 0;
    header('Content-Type: application/json');
    foreach ($responses as $response) {
        foreach($command as $comm) {
            if (in_array($comm, $response->command)) {
                $found = 1;
                $output = json_encode($response->reply);
            }
        }
    }
    if ($found === 0) {
        $output = json_encode($responses[0]->reply);
    }
    echo $output;
}

/**
 * Handles the "emote=" GET request. Takes the emotion's name and combines it with a string
 * to let the user know that their feelings have been communicated to Apathy. Returns this string.
 * @param {string} $emote - the emotion communicated by the user
 * @returns {string} - a message based on provided emotion
 */
function handle_emote($emote) {
    header('Content-Type: text/plain');
    $sentence = "You let Apathy know that he made you feel ";
    if ($emote === "angry") {
        echo $sentence.$emote;
    } else if ($emote === "happy") {
        echo $sentence.$emote;
    } else if ($emote === "somber") {
        echo $sentence.$emote;
    } else {
        header("HTTP/1.1 400 Invalid Request");
        echo "Error: No emote has been selected";
    }
}

?>