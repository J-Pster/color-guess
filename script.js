// Defininto atalhos de funções
const query = document.querySelector.bind(document);

// Definindo variáveis globais
const colorContainer = query('#colors-container');
const colorDisplay = query('#rgb-color');
const answerDisplay = query('#answer');
const placar = query('#score');

let quantiaDeCores = 6;
let pontosNoPlacar = 0;

const botaoReset = query('#reset-game');
const botaoAumentaDif = query('#increse-dif');

// Gerando as Cores da Rodada
function gerandoCorAleatoria() {
  const r = () => Math.floor(Math.random() * 256);
  const color = `(${r()}, ${r()}, ${r()})`;
  return color;
}

function gerandoCoresDaRodada() {
  const cores = [];
  for (let index = 0; index < quantiaDeCores; index += 1) {
    cores.push(gerandoCorAleatoria());
  }
  return cores;
}

// Gerando o placar e aumentando pontos no Placar
function gerarPlacar() {
  placar.innerText = `Placar: ${pontosNoPlacar}`;
}

function atualizarPlacar(valor) {
  pontosNoPlacar += valor;
  placar.innerText = `Placar: ${pontosNoPlacar}`;
}

// Escolhendo a cor correta
let coresDaRodada = gerandoCoresDaRodada();
let corCorreta = '';

function colocandoCorCorreta() {
  corCorreta = coresDaRodada[Math.floor(Math.random() * coresDaRodada.length)];
  colorDisplay.innerText = corCorreta;

  const coresNaTela = colorContainer.children;
  for (let i = 0; i < coresNaTela.length; i += 1) {
    const corDoIndex = coresNaTela[i].style.backgroundColor;
    const corCerta = `rgb${corCorreta}`;
    if (corDoIndex === corCerta) {
      coresNaTela[i].id = 'colorAnswer';
    }
  }
}

// Função de Acertou ou Errou
function verificarAcerto(event) {
  const origem = event.target;
  if (origem.id === 'colorAnswer') {
    answerDisplay.innerText = 'Acertou!';
    atualizarPlacar(3);
    return;
  }
  answerDisplay.innerText = 'Errou! Tente novamente!';
}

// Gerando as bolas de cor na tela
function gerandoBolasDeCor() {
  for (let i = 0; i < coresDaRodada.length; i += 1) {
    const bolaDeCor = document.createElement('div');
    bolaDeCor.classList.add('ball');
    const corEmRgb = `rgb${coresDaRodada[i]}`;
    bolaDeCor.style.backgroundColor = corEmRgb;
    bolaDeCor.addEventListener('click', verificarAcerto);
    colorContainer.appendChild(bolaDeCor);
  }
}

// Função para Reiniciar o Jogo
function reiniciarJogo() {
  colorContainer.innerHTML = '';
  coresDaRodada = gerandoCoresDaRodada();
  corCorreta = '';
  answerDisplay.innerText = 'Escolha uma cor';
  gerandoBolasDeCor();
  colocandoCorCorreta();
}

botaoReset.addEventListener('click', reiniciarJogo);

// Função para aumentar dificuldade
function aumentarDificuldade() {
  quantiaDeCores += 1;
  reiniciarJogo();
}

botaoAumentaDif.addEventListener('click', aumentarDificuldade);

// Começando o Jogo
window.onload = () => {
  gerandoBolasDeCor();
  colocandoCorCorreta();
  gerarPlacar();
};
