const cartasContainer = document.getElementById('cartasContainer');
const imagens = [
    'assets/bobrossparrot.gif',
    'assets/explodyparrot.gif',
    'assets/fiestaparrot.gif',
    'assets/metalparrot.gif',
    'assets/revertitparrot.gif',
    'assets/tripletsparrot.gif',
    'assets/unicornparrot.gif'
];

let cartas = [];
let clicks = 0;
let primeiraCarta = null;
let segundaCarta = null;
let lockBoard = false;

let qtde;
do {
    qtde = Number(prompt("Com quantas cartas você deseja jogar? (par, entre 4 e 14)"));
} while (qtde < 4 || qtde > 14 || qtde % 2 !== 0);

function criarCartas() {
    const pares = qtde / 2;
    
    for (let i = 0; i < pares; i++) {
        cartas.push(i);
        cartas.push(i);
    }
    
    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach(num => {
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta');

        const cartaContainer = document.createElement('div');
        
        const verso = document.createElement('img');
        verso.src = 'assets/back.png'; 
        verso.classList.add('back');

        const frente = document.createElement('img');
        frente.src = imagens[num]; 
        frente.classList.add('front');

        cartaContainer.appendChild(verso);
        cartaContainer.appendChild(frente);
        cartaDiv.appendChild(cartaContainer);
        
        cartaDiv.addEventListener('click', () => clicarCarta(cartaDiv));
        
        cartasContainer.appendChild(cartaDiv);
    });
}

function clicarCarta(carta) {
    if (lockBoard || carta.classList.contains('clicada')) return;

    carta.classList.add('clicada');
    clicks++;

    const cartaContainer = carta.querySelector('div');
    cartaContainer.style.transform = 'rotateY(180deg)'; 

    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }
    
    segundaCarta = carta;
    verificarPar();
}

function verificarPar() {
    const primeiraNum = primeiraCarta.querySelector('img.front').src;
    const segundaNum = segundaCarta.querySelector('img.front').src;

    if (primeiraNum === segundaNum) {
        resetarCartas();
        verificarFimDeJogo();
    } else {
        lockBoard = true; 
        setTimeout(() => {
            primeiraCarta.querySelector('div').style.transform = 'rotateY(0deg)'; 
            segundaCarta.querySelector('div').style.transform = 'rotateY(0deg)'; 
            primeiraCarta.classList.remove('clicada'); 
            segundaCarta.classList.remove('clicada'); 
            resetarCartas();
        }, 1000);
    }
}

function resetarCartas() {
    primeiraCarta = null;
    segundaCarta = null;
    lockBoard = false; 
}

function verificarFimDeJogo() {
    const todasAsCartas = document.querySelectorAll('.carta');
    const cartasViradas = Array.from(todasAsCartas).filter(carta => carta.classList.contains('clicada'));
    
    if (cartasViradas.length === qtde) {
        setTimeout(() => {
            alert(`Você ganhou com ${clicks} jogadas!`);
        }, 1000); 
    }
}

criarCartas();
