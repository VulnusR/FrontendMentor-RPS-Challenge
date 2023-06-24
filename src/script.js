const gameBtn = document.querySelectorAll('.btn-game');
const r = document.getElementById('btn-rock');
const p = document.getElementById('btn-paper');
const s = document.getElementById('btn-scissors');



//Logs the btn chosen by user
let userChoice = '';

gameBtn.forEach(button => {
    button.addEventListener('click', function() {
        userChoice = this.id.split('-')[1].charAt(0); // This captures 'r', 'p' or 's'
        console.log(`${userChoice} clicked!`);


        let choices = ['r', 'p', 's'];
        let computerChoice = choices[Math.floor(Math.random() * 3)];
        console.log(`Computer chose: ${computerChoice}`);

        let gameResult = getGameResult(userChoice, computerChoice);
        console.log(`Game result: ${gameResult}`);

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




