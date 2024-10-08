const savedScore = localStorage.getItem('score');

function mostrarPontuacao() {
    const container = document.querySelector('.container');
    const pontuacaoElemento = document.createElement('p'); 
    pontuacaoElemento.id = 'finalPoints';
    pontuacaoElemento.textContent = `Pontuação Final: ${savedScore}`; 
    container.appendChild(pontuacaoElemento); 
    const fimButton = document.getElementById('fimButton');
    container.insertBefore(pontuacaoElemento, fimButton); 
}

window.onload = mostrarPontuacao;
