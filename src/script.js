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
