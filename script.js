const countries = [
    ["china", "img/pais/China.png", "Maior exportador do mundo", "17,96 tri", "img/bandeiras/china.svg"],
    ["colômbia", "img/pais/Colômbia.png", "Guerra contra o narcotráfico", "343,6 bi", "img/bandeiras/colômbia.svg"],
    ["espanha", "img/pais/Espanha.png", "País famoso pela corrida de touros", "1,41 tri", "img/bandeiras/Espanha.svg"],
    ["holanda", "img/pais/Holanda.png", "Existem mais de 160 canais navegaveis neste país", "1 tri", "img/bandeiras/Holanda.svg"],
    ["hungria", "img/pais/Hungria.png", "Sua capital é Budapeste", "177,3 bi", "img/bandeiras/hungria.svg"],
    ["gana", "img/pais/Gana.png", "Primeiro país africano a conquistar independência", "73,77 bi", "img/bandeiras/gana.svg"],
    ["fiji", "img/pais/Fiji.png", "Composto por mais de 300 ilhas", "4,98 bi", "img/bandeiras/fiji.svg"],
    ["guatemala", "img/pais/Guatemala.png", "Famoso por cultura Maia", "95 bi", "img/bandeiras/guatemala.svg"],
    ["camarões", "img/pais/Camarões.png", "A língua oficial é o Francês", "43,64 bi", "img/bandeiras/camarões.svg"],
    ["afeganistão", "img/pais/Afeganistão.png", "Tem uma alimentação baseada em grãos", "14,27 bi", "img/bandeiras/afeganistão.svg"]
];

let remainingCountries = [...countries];
let currentCountry;
let attempts = 0;
let score = 0;
let maxAttempts = 4;
let roundPoints = [1000, 750, 500, 250];
let gameStarted = false;

const formatImage = document.getElementById('country-format');
const hint1 = document.getElementById('hint-1');
const hint2 = document.getElementById('hint-2');
const flag = document.getElementById('flag');
const guessInput = document.getElementById('guess-input');
const message = document.getElementById('message');
const message1 = document.getElementById('message1');
const attemptsText = document.getElementById('attempts');
const scoreText = document.getElementById('score');

document.getElementById('submit-guess').addEventListener('click', handleGuess);
guessInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

guessInput.addEventListener('input', function () {
    if (message.textContent === "Por favor, insira um palpite!") {
        message.textContent = "";
    }
});

const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const rulesLink = document.getElementById('rules');
const sobreNosLink = document.getElementById('sobre-nos');
const contatoLink = document.getElementById('contato');

window.onload = function() {
    modal.style.display = "block";
};

closeModal.onclick = function() {
    modal.style.display = "none";
    if (!gameStarted) {
        startGame();
        gameStarted = true;
    }
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        if (!gameStarted) {
            startGame();
            gameStarted = true;
        }
    }
};

rulesLink.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = "block";
});

sobreNosLink.addEventListener('click', function(event) {
    event.preventDefault();
});

contatoLink.addEventListener('click', function(event) {
    event.preventDefault();
});

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function startGame() {
    if (remainingCountries.length === 0) {
        message1.textContent = "Jogo encerrado! Pontuação total: " + score;
        window.location.href = "fim.html";
        return;
    }

    attempts = 0;
    message.textContent = "";
    message1.textContent = "";
    guessInput.value = "";
    attemptsText.textContent = maxAttempts;

    const randomIndex = Math.floor(Math.random() * remainingCountries.length);
    currentCountry = remainingCountries.splice(randomIndex, 1)[0];

    formatImage.src = currentCountry[1];
    hint1.textContent = "";
    hint2.textContent = "";
    flag.src = "";
    
    hint1.classList.add('hidden');
    hint2.classList.add('hidden');
    flag.classList.add('hidden');
}

function handleGuess() {
    const guess = removeAccents(guessInput.value.toLowerCase().trim());
    guessInput.value = "";

    if (!guess) {
        message.textContent = "Por favor, insira um palpite!";
        return;
    }

    attempts++;
    const remainingAttempts = maxAttempts - attempts;
    attemptsText.textContent = remainingAttempts >= 0 ? remainingAttempts : 0;

    if (guess === removeAccents(currentCountry[0])) {
        score += roundPoints[attempts - 1];
        localStorage.setItem('score', score);
        message1.textContent = "Você acertou! Próximo país!";
        setTimeout(startGame, 2500);
    } else if (attempts < maxAttempts) {
        revealHint();
    } else {
        message.textContent = `Você não acertou. O país era ${currentCountry[0]}. Próximo país!`;
        attemptsText.textContent = 0;
        setTimeout(startGame, 2500);
    }

    scoreText.textContent = score;
}

function revealHint() {
    if (attempts === 1) {
        hint1.textContent = `Curiosidade: ${currentCountry[2]}`;
        hint1.classList.remove('hidden');
    } else if (attempts === 2) {
        hint2.textContent = `PIB: ${currentCountry[3]}`;
        hint2.classList.remove('hidden');
    } else if (attempts === 3) {
        flag.src = currentCountry[4];
        flag.classList.remove('hidden');
    }
}

startGame();
