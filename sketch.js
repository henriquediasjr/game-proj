// Tamanho da tela
let larguraTela = 800;
let alturaTela = 500;

// Guarda em qual tela o jogo esta
let estadoJogo = "inicio";

// Objeto simples do jogador
let jogador = {
  x: 370,
  y: 430,
  largura: 60,
  altura: 30,
  velocidade: 320
};

// Array dos obstaculos
let obstaculos = [];

// Variaveis de controle do jogo
let tempoObstaculo = 0;
let proximoTempoObstaculo = 0;
let tempoPontuacao = 0;
let tempoDeJogo = 0;
let pontuacao = 0;
let melhorPontuacao = 0;
let ordemFaixas = [];

function setup() {
  // Cria a area do jogo
  let canvas = createCanvas(larguraTela, alturaTela);
  let areaDoJogo = document.getElementById("game-container");

  if (areaDoJogo) {
    canvas.parent("game-container");
  }

  textFont("Arial");

  // Deixa o jogador e as variaveis na posicao inicial
  prepararNovoJogo();
}

function draw() {
  // Decide qual tela deve aparecer
  if (estadoJogo === "inicio") {
    telaInicial();
    verificarInicioDoJogo();
  } else if (estadoJogo === "jogando") {
    rodarJogo();
  } else if (estadoJogo === "gameover") {
    telaGameOver();
    verificarReinicio();
  }
}

function telaInicial() {
  desenharFundoInicial();

  // Moldura principal
  stroke(160, 195, 255);
  strokeWeight(2);
  fill(15, 24, 52, 235);
  rect(95, 55, 610, 390, 28);

  // Etiqueta superior
  noStroke();
  fill(92, 127, 255);
  rect(310, 88, 180, 34, 18);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("JOGO RAPIDO", 400, 105);

  // Textos da tela inicial
  fill(255);
  textSize(34);
  text("DESVIE DOS", 400, 165);
  text("OBSTACULOS", 400, 205);

  fill(210, 220, 255);
  textSize(18);
  text("Use as setas para se mover e sobreviva o maximo que puder", 400, 250);

  fill(35, 45, 80);
  rect(165, 282, 205, 44, 14);
  rect(430, 282, 205, 44, 14);

  fill(235, 240, 255);
  textSize(16);
  text("SETAS = mover", 267, 304);
  text("ESPACO = comecar", 532, 304);

  desenharBotaoInicial();

  // Pequenos elementos para lembrar o jogo
  fill(220, 80, 80);
  rect(215, 393, 72, 18, 6);
  rect(515, 387, 95, 24, 6);

  fill(80, 220, 120);
  rect(370, 386, 60, 26, 8);
}

function desenharFundoInicial() {
  // Faz um fundo em degrade usando linhas simples
  for (let i = 0; i < alturaTela; i = i + 1) {
    let mistura = map(i, 0, alturaTela, 0, 1);
    let corR = lerp(10, 28, mistura);
    let corG = lerp(18, 46, mistura);
    let corB = lerp(44, 120, mistura);

    stroke(corR, corG, corB);
    line(0, i, larguraTela, i);
  }

  noStroke();
  fill(255, 255, 255, 18);
  circle(120, 100, 150);
  circle(690, 92, 110);

  fill(90, 130, 255, 28);
  circle(710, 410, 190);

  stroke(255, 255, 255, 22);
  strokeWeight(1);
  line(133, 0, 133, alturaTela);
  line(266, 0, 266, alturaTela);
  line(399, 0, 399, alturaTela);
  line(532, 0, 532, alturaTela);
  line(665, 0, 665, alturaTela);
}

function desenharBotaoInicial() {
  // O botao ganha um pequeno movimento para chamar atencao
  let deslocamento = sin(frameCount * 0.05) * 3;

  fill(123, 227, 143);
  rect(250, 332 + deslocamento, 300, 58, 18);

  fill(18, 36, 24);
  textSize(20);
  text("PRESSIONE UMA TECLA", 400, 361 + deslocamento);
}

function verificarInicioDoJogo() {
  // Comeca o jogo quando uma tecla de acao e pressionada
  if (teclaDeAcaoPressionada()) {
    prepararNovoJogo();
    estadoJogo = "jogando";
  }
}

function rodarJogo() {
  // Desenha o fundo do jogo
  strokeWeight(0);
  fill(18, 18, 30);
  rect(0, 0, larguraTela, alturaTela);

  // Desenha as linhas das faixas
  stroke(70, 70, 100);
  strokeWeight(2);
  line(133, 0, 133, alturaTela);
  line(266, 0, 266, alturaTela);
  line(399, 0, 399, alturaTela);
  line(532, 0, 532, alturaTela);
  line(665, 0, 665, alturaTela);

  tempoDeJogo = tempoDeJogo + deltaTime;

  moverJogador();
  criarObstaculos();
  moverObstaculos();
  desenharObstaculos();
  desenharJogador();
  atualizarPontuacao();
  desenharPontuacao();
  verificarColisao();
}

function moverJogador() {
  // Usa deltaTime para deixar o movimento mais suave
  let movimento = jogador.velocidade * (deltaTime / 1000);

  // Move para a esquerda
  if (keyIsDown(LEFT_ARROW)) {
    jogador.x = jogador.x - movimento;
  }

  // Move para a direita
  if (keyIsDown(RIGHT_ARROW)) {
    jogador.x = jogador.x + movimento;
  }

  // Move para cima
  if (keyIsDown(UP_ARROW)) {
    jogador.y = jogador.y - movimento;
  }

  // Move para baixo
  if (keyIsDown(DOWN_ARROW)) {
    jogador.y = jogador.y + movimento;
  }

  // Impede o jogador de sair da tela
  if (jogador.x < 0) {
    jogador.x = 0;
  }

  if (jogador.x + jogador.largura > larguraTela) {
    jogador.x = larguraTela - jogador.largura;
  }

  if (jogador.y < 0) {
    jogador.y = 0;
  }

  if (jogador.y + jogador.altura > alturaTela) {
    jogador.y = alturaTela - jogador.altura;
  }
}

function desenharJogador() {
  // Desenha o retangulo do jogador
  stroke(255);
  strokeWeight(2);
  fill(80, 220, 120);
  rect(jogador.x, jogador.y, jogador.largura, jogador.altura);
}

function criarObstaculos() {
  // Conta o tempo para criar um novo obstaculo
  tempoObstaculo = tempoObstaculo + deltaTime;

  if (tempoObstaculo >= proximoTempoObstaculo) {
    let larguraObstaculo = sortearNumero(70, 120);
    let alturaObstaculo = sortearNumero(25, 55);
    let posicaoX = sortearPosicaoXObstaculo(larguraObstaculo);

    // Coloca o novo obstaculo dentro do array
    obstaculos.push({
      x: posicaoX,
      y: -60,
      largura: larguraObstaculo,
      altura: alturaObstaculo,
      velocidadeExtra: sortearNumero(0, 150)
    });

    tempoObstaculo = 0;
    proximoTempoObstaculo = sortearTempoObstaculo();
  }
}

function sortearTempoObstaculo() {
  // Com o tempo de partida, os obstaculos aparecem mais rapido
  let segundosDeJogo = tempoDeJogo / 1000;
  let tempoBase = 950 - segundosDeJogo * 35;
  let tempoFinal = tempoBase + sortearNumero(-150, 150);

  return constrain(tempoFinal, 120, 1000);
}

function moverObstaculos() {
  // Percorre o array dos obstaculos
  let velocidadeAtualDoJogo = calcularVelocidadeAtualDoJogo();

  for (let i = 0; i < obstaculos.length; i = i + 1) {
    let velocidadeFinal = velocidadeAtualDoJogo + obstaculos[i].velocidadeExtra;

    obstaculos[i].y = obstaculos[i].y + velocidadeFinal * (deltaTime / 1000);
  }

  obstaculos = obstaculos.filter(function (obstaculo) {
    return obstaculo.y < alturaTela + 80;
  });
}

function desenharObstaculos() {
  // Desenha todos os obstaculos do array
  for (let i = 0; i < obstaculos.length; i = i + 1) {
    stroke(255);
    strokeWeight(2);
    fill(220, 80, 80);
    rect(obstaculos[i].x, obstaculos[i].y, obstaculos[i].largura, obstaculos[i].altura);
  }
}

function verificarColisao() {
  // Verifica se o jogador encostou em algum obstaculo
  for (let i = 0; i < obstaculos.length; i = i + 1) {
    if (
      jogador.x < obstaculos[i].x + obstaculos[i].largura &&
      jogador.x + jogador.largura > obstaculos[i].x &&
      jogador.y < obstaculos[i].y + obstaculos[i].altura &&
      jogador.y + jogador.altura > obstaculos[i].y
    ) {
      if (pontuacao > melhorPontuacao) {
        melhorPontuacao = pontuacao;
      }

      estadoJogo = "gameover";
    }
  }
}

function atualizarPontuacao() {
  // A pontuacao aumenta com o tempo
  tempoPontuacao = tempoPontuacao + deltaTime;

  if (tempoPontuacao >= 1000) {
    pontuacao = pontuacao + 1;
    tempoPontuacao = tempoPontuacao - 1000;
  }
}

function desenharPontuacao() {
  // Mostra os pontos na tela
  fill(255);
  strokeWeight(1);
  textAlign(LEFT, BASELINE);
  textSize(20);
  text("Pontos: " + pontuacao, 20, 30);
  text("Recorde: " + melhorPontuacao, 20, 60);
}

function telaGameOver() {
  // Fundo da tela final
  strokeWeight(0);
  fill(60, 20, 20);
  rect(0, 0, larguraTela, alturaTela);

  // Caixa central
  stroke(255);
  strokeWeight(4);
  fill(120, 40, 40);
  rect(120, 100, 560, 280);

  // Textos da tela final
  fill(255);
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  textSize(34);
  text("GAME OVER", 400, 170);

  textSize(24);
  text("Pontuacao final: " + pontuacao, 400, 240);
  text("Melhor pontuacao: " + melhorPontuacao, 400, 285);
  text("Pressione ESPACO para reiniciar", 400, 340);
}

function verificarReinicio() {
  // Reinicia o jogo apenas quando o espaco e pressionado
  if (keyIsDown(32)) {
    prepararNovoJogo();
    estadoJogo = "jogando";
  }
}

function prepararNovoJogo() {
  // Volta o jogador para o lugar inicial
  jogador.x = 370;
  jogador.y = 430;

  // Limpa as variaveis do jogo
  obstaculos = [];
  ordemFaixas = [];
  tempoObstaculo = 0;
  tempoPontuacao = 0;
  tempoDeJogo = 0;
  pontuacao = 0;
  proximoTempoObstaculo = sortearTempoObstaculo();
}

function teclaDeAcaoPressionada() {
  // Usa keyIsDown() para ler as teclas mais importantes do jogo
  if (
    keyIsDown(32) ||
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(UP_ARROW) ||
    keyIsDown(DOWN_ARROW)
  ) {
    return true;
  } else {
    return false;
  }
}

function sortearNumero(minimo, maximo) {
  return minimo + Math.random() * (maximo - minimo);
}

function sortearInteiro(minimo, maximo) {
  return Math.floor(sortearNumero(minimo, maximo + 1));
}

function sortearPosicaoXObstaculo(larguraObstaculo) {
  let faixas = [20, 150, 280, 410, 540, 670];

  if (ordemFaixas.length === 0) {
    ordemFaixas = [0, 1, 2, 3, 4, 5];

    for (let i = ordemFaixas.length - 1; i > 0; i = i - 1) {
      let indiceAleatorio = sortearInteiro(0, i);
      let valorTemporario = ordemFaixas[i];

      ordemFaixas[i] = ordemFaixas[indiceAleatorio];
      ordemFaixas[indiceAleatorio] = valorTemporario;
    }
  }

  let faixaEscolhida = ordemFaixas.pop();
  let deslocamentoHorizontal = sortearNumero(-18, 18);
  let posicaoX = faixas[faixaEscolhida] + deslocamentoHorizontal;

  return constrain(posicaoX, 0, larguraTela - larguraObstaculo);
}

function calcularVelocidadeAtualDoJogo() {
  let segundosDeJogo = tempoDeJogo / 1000;

  return 240 + segundosDeJogo * 28;
}
