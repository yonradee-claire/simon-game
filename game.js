// Array holding the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty array to store the game pattern
var gamePattern = [];

// Current level, starting at 0
var level = 0;

// Flag to track if the game has started
var gameStarted = false;

// Detect when a key is pressed for the first time to start the game
document.addEventListener("keydown", function() {
    if (!gameStarted) {
        gameStarted = true;  // Game has started
        nextSequence(); // Start the first sequence
        document.querySelector("h1").innerText = "Level " + level; // Update the title
    }
});

// Function to generate the next sequence
function nextSequence() {
    // Reset the user pattern for the next level
    userPattern = [];

    // Increase the level by 1 each time nextSequence() is called
    level++;

    // Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    // Select a random color from the buttonColours array
    var randomChosenColour = buttonColours[randomNumber];

    // Add the new random color to the gamePattern array
    gamePattern.push(randomChosenColour);

    // Flash animation on the selected button
    document.getElementById(randomChosenColour).classList.add("pressed"); 

    // Play the sound corresponding to the chosen color
    playSound(randomChosenColour);

    // Remove the class after 100ms
    setTimeout(function() {
        document.getElementById(randomChosenColour).classList.remove("pressed");
    }, 100);

    // Update the title to show the current level
    document.querySelector("h1").innerText = "Level " + level;
}

// Function to play the sound for the selected color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(error => {
        console.error("Error playing sound:", error);
    });
}

// Event listener for when a button is clicked
var buttons = document.querySelectorAll(".btn");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        var userChosenColour = this.id; // Get the ID of the clicked button

        // Add the chosen color to the user's pattern
        userPattern.push(userChosenColour);

        // Play the sound for the clicked button
        playSound(userChosenColour);

        // Animate the button that was clicked
        animatePress(userChosenColour);

        // Check if the user's input matches the game pattern so far
        checkAnswer(userPattern.length - 1);
    });
});

// Function to check if the user's answer is correct
function checkAnswer(currentLevel) {
    // If the user's answer is incorrect
    if (gamePattern[currentLevel] !== userPattern[currentLevel]) {
        // Game over condition
        gameOver();
    } else {
        // If the user has completed the entire sequence correctly
        if (userPattern.length === gamePattern.length) {
            // After a successful round, call nextSequence to go to the next level
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
}

// Function to end the game
function gameOver() {
    // Play the game over sound
    playSound("wrong");

    // Apply the "game-over" class to the body
    document.body.classList.add("game-over");

    // Update the title to show game over
    document.querySelector("h1").innerText = "Game Over, Press Any Key to Restart";
    
    // Remove the "game-over" class from the body after 200ms
    setTimeout(function() {
        document.body.classList.remove("game-over");
    }, 200);

    // Reset the game
    gamePattern = [];
    userPattern = [];
    level = 0;
    gameStarted = false;
}

// Function to animate button press (adding/removing the pressed class)
function animatePress(currentColour) {
    var currentButton = document.getElementById(currentColour);

    // Add the "pressed" class to animate the button
    currentButton.classList.add("pressed");

    // Remove the "pressed" class after 100ms to reset the button's style
    setTimeout(function() {
        currentButton.classList.remove("pressed");
    }, 100);
}