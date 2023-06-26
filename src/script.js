const gameBtn = document.querySelectorAll('.btn-game');
const r = document.getElementById('btn-rock');
const p = document.getElementById('btn-paper');
const s = document.getElementById('btn-scissors');

//RPS GAME LOGIC
//Logs the btn chosen by user
let userChoice = '';

gameBtn.forEach(button => {
    button.addEventListener('click', function() {
        // This captures 'r', 'p' or 's' from the user's selection
        userChoice = this.id.split('-')[1].charAt(0); 
        console.log(`${userChoice} clicked!`);

        // Randomly generates the Computer's choice as 'r', 'p' or 's'
        let choices = ['r', 'p', 's'];
        let computerChoice = choices[Math.floor(Math.random() * 3)];
        console.log(`Computer chose: ${computerChoice}`);

        //passes userChoice, and computerChoice strings into the user & computer parameters of the getGameResults function & returns the results of that function
        let gameResult = getGameResult(userChoice, computerChoice);
        console.log(`Game result: ${gameResult}`);


        //Updates score based off of gameResult, using the updateScore function
        if (gameResult === 'win') {
            updateScore(score + 1);
        } else if (gameResult === 'lose') {
            updateScore(score - 1);
        }

        endGameRound(userChoice, computerChoice, gameResult);
    });
});

function getGameResult(user, computer) {
    if (user === computer) {
        return 'draw';
    } 
    
    else if ((user === 'r' && computer === 'p') || (user === 'p' && computer === 's') || (user === 's' && computer === 'r')) {
        return 'lose';
    } 
    
    else {
        return 'win';
    }
}

//SCORE UPDATE LOGIC
//Determines the value of the score from localStorage OR sets the score at zero IF there is no score in the localStorage
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
//Displays score on page load. Semi-crucial because without it the score wont display on page load until after the gameBtn.forEach(button => {...} function call
updateScore(score);

function updateScore(newScore) {
    score = newScore;
    localStorage.setItem('score', score);
    document.getElementById('score').textContent = score;
}

let mainPage = document.querySelector('#page-parent');
let roundStart = document.querySelector('#round-start');
let roundResults = document.querySelector('#round-results');

//Element Not In DOM, Ready to be inserted
roundResults.remove();



function endGameRound(userChoice, computerChoice, gameResult) {
    //clears the DOM of the Game page HTML & Replaces it with the Results Page
    roundStart.remove();
    mainPage.appendChild(roundResults);

    // Replaces the results dynamic text based on game results
    let resultTextElement = document.getElementById('results-lower-center-text');

    console.log('Game result:', gameResult); 

    // The newRoundButton **MUST** be contained in the endGameRound function because if placed outside the function there is an async between the roundResults section of the DOM loading, and even if the roundResults is loaded, the newRoundButton will have tried to load the DOM prior to the insertion of the roundResults HTML. Meaning that the #results-btn will never be found and thus the user will be stuck on the results page with no way to return to the game page.
    let newRoundButton = document.querySelector('#results-btn');

    newRoundButton.addEventListener('click', function() {
        roundResults.remove();
        mainPage.appendChild(roundStart);
    });

    if (gameResult === 'win') {
        resultTextElement.innerText = "You Win!";
    } else if (gameResult === 'lose') {
        resultTextElement.innerText = "You   Lose!";
    } else if (gameResult === 'draw') {
        resultTextElement.innerText = "Draw!";
    }

     // Generate HTML for user's choice and computer's choice
     let userChoiceHTML = generateChoiceHTML(userChoice);
     let compChoiceHTML = generateChoiceHTML(computerChoice);

     let userChoiceDisplay = document.querySelector('#results-user-choice');
     let compChoiceDisplay = document.querySelector('#results-comp-choice');
 
     // Add choices to the display
     userChoiceDisplay.innerHTML = userChoiceHTML;
     compChoiceDisplay.innerHTML = compChoiceHTML;

     currentPage = 'round-results';
}

//Mostly pointless but used for img Alts on results section
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Dynamically Generates html elements for results page based on user and computer choices on the game page. function called by choice select/btn press on game page, but techincally called by endGameRound function.
function generateChoiceHTML(choice) {
    //Sets color of outer ring
    let colorClass = "";
    //Used to find Icon in filesystem
    let resultsIcon = "";

    //translates results into usable strings for html
    switch (choice) {
        case "r":
            colorClass = "bg-red-600 hover:bg-rose-600",
            resultsIcon = "rock";
            break;
        case "p":
            colorClass = "bg-blue-400 hover:bg-sky-400",
            resultsIcon = "paper";
            break;
        case "s":
            colorClass = "bg-yellow-400 hover:bg-amber-450",
            resultsIcon = "scissors";
            break;
    }

    console.log({choice})

    //Generates Html
    return `
        <div id="display-${choice}" class="btn-game ${colorClass} main-game-btn result-sm-white-shadow-effect md:md-main-game-btn md:white-shadow-effect lg:lg-main-game-btn lg:white-shadow-effect xl:white-shadow-effect xl:xl-main-game-btn">
            <div class="game-btn-inner bg-white md:md-game-btn-inner lg:lg-game-btn-inner xl:xl-game-btn-inner">
                <img src="./images/icon-${resultsIcon}.svg" alt="${capitalizeFirstLetter(choice)} Icon for RPS" />
            </div>
        </div>
    `;
}

let currentPage = 'round-start'; // This could be 'round-start' or 'round-results'
let rulesPage = document.querySelector('#rules-page'); // Changed 'rules-page' to '#rules-page'
let rulesBtn = document.querySelector('#btn-rules'); // Changed 'btn-rules' to '#btn-rules'
let closeButton = document.querySelector('#btn-close-rules'); // Added this line to select 'close' button
let footer = document.querySelector('#footer-parent');

rulesPage.remove();
closeButton.remove();




rulesBtn.addEventListener('click', function() {
    // Hide current page
    if (currentPage === 'round-start') {
        roundStart.remove();
    } else if (currentPage === 'round-results') {
        roundResults.remove();
    }

    
    rulesBtn.remove()
    mainPage.appendChild(rulesPage);
    footer.appendChild(closeButton);
});

closeButton.addEventListener('click', function() {
    

    // Show the page the user was on before
    if (currentPage === 'round-start') {
        mainPage.appendChild(roundStart);
    } else if (currentPage === 'round-results') {
        mainPage.appendChild(roundResults);
    }

    

    rulesPage.remove()
    closeButton.remove()

    footer.appendChild(rulesBtn)
});




   





