


// START SCREEN
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';

    //reset game board
    resetBoard();
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray)
});

//GAME BOARD
const keyboard = document.querySelectorAll('#qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

//PHRASES
const phrases = [
    'love that journey for me',
    'simply the best',
    'bobs bagels',
    'alexis something rose',
    'fold in the cheese'
];

function getRandomPhraseAsArray(arr){ return getRandomPhrase(arr.length).split(""); }

function getRandomPhrase(max){ return phrases[Math.floor(Math.random() * max)]; }

function addPhraseToDisplay(arr){
    for(const letter of arr){
        const li = document.createElement('li');
        li.textContent = letter;
        if(li.textContent !== " "){
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        document.querySelector('#phrase ul').append(li)
    }
}


//CHECK LETTERS FOR A MATCH
function checkLetter(button){
    const letters = document.querySelectorAll('.letter');
    let matchedLetter;

    for(const letter of letters){

        if(button.textContent === letter.textContent){
            letter.classList.add('show');
            matchedLetter = letter.textContent;
        }
    }

    return matchedLetter;
}

//HANDLE KEYBOARD INTERACTIONS
const keys = document.querySelectorAll('.keyrow button')
for(const key of keys) {
    key.addEventListener('click', () => {
        key.classList.add('chosen');
        key.disabled = true;
        const letterFound = checkLetter(key);

        if(!letterFound){
            missed++;
            const heart = document.querySelector('.tries img[src="images/liveHeart.png"]');
            heart.setAttribute('src', 'images/lostHeart.png')
        }
        checkWin();
     })
}


//ENDGAME
function checkWin(){
    const guessedLetters = document.querySelectorAll('.show');
    const phraseLetters = document.querySelectorAll('.letter');

    if(guessedLetters.length === phraseLetters.length){
        overlay.classList.add('win');
        overlay.style.display = 'flex';
    } 
    
    if(missed >= 5){
        overlay.classList.add('lose');
        overlay.style.display = 'flex';
    }
}


//RESET PHRASE LI ELEMENTS
function resetPhrase(){
    const previousGuesses = document.querySelectorAll('#phrase ul li');
    if(previousGuesses){
        previousGuesses.forEach(li => li.remove())
    }
}

function resestKeyboard(){
    keys.forEach(key => key.disabled = false)
    document.querySelectorAll('.chosen').forEach(letter => letter.className = '');
}

function resetHearts(){
    document.querySelectorAll('.tries img[src="images/lostHeart.png"]').forEach(heart => heart.setAttribute('src', 'images/liveHeart.png'));
}

function resetOverlay(){
    overlay.className = '';
}

function resetBoard(){
    missed = 0;
    
    resetPhrase();
    resestKeyboard();
    resetHearts();
    resetOverlay();
}