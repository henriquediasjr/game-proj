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
let tempoPontuacao = 0;
let pontuacao = 0;
let melhorPontuacao = 0;
let proximaFaixa = 0;

function setup() {
  // Cria a area do jogo
  createCanvas(larguraTela, alturaTela);

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
  // Fundo da tela inicial
  strokeWeight(0);
  fill(20, 30, 70);
  rect(0, 0, larguraTela, alturaTela);

  // Moldura principal
  stroke(255);
  strokeWeight(4);
  fill(40, 60, 130);
  rect(100, 70, 600, 360);

  // Caixa do titulo
  fill(70, 100, 190);
  rect(150, 120, 500, 70);

  // Textos da tela inicial
  fill(255);
  strokeWeight(1);
  textSize(30);
  text("DESVIE DOS OBSTACULOS", 205, 165);

  textSize(22);
  text("Pressione qualquer tecla", 255, 250);
  text("ESPACO ou setas ja comecam o jogo", 205, 290);

  // Linha visual
  stroke(255);
  strokeWeight(3);
  line(220, 340, 580, 340);

  // Ciculos decorativos
  fill(255, 220, 80);
  circle(220, 375, 25);
  circle(400, 375, 25);
  circle(580, 375, 25);
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

  if (tempoObstaculo >= 900) {
    let posicaoX = 25;

    // Escolhe em qual faixa o obstaculo vai nascer
    if (proximaFaixa === 0) {
      posicaoX = 25;
    } else if (proximaFaixa === 1) {
      posicaoX = 155;
    } else if (proximaFaixa === 2) {
      posicaoX = 285;
    } else if (proximaFaixa === 3) {
      posicaoX = 415;
    } else if (proximaFaixa === 4) {
      posicaoX = 545;
    } else if (proximaFaixa === 5) {
      posicaoX = 675;
    }

    // Altura simples para criar pequenas variacoes
    let alturaObstaculo = 30;

    if (proximaFaixa === 1 || proximaFaixa === 4) {
      alturaObstaculo = 45;
    }

    // Coloca o novo obstaculo dentro do array
    obstaculos.push({
      x: posicaoX,
      y: -60,
      largura: 100,
      altura: alturaObstaculo,
      velocidade: 180 + pontuacao * 2
    });

    // Vai para a proxima faixa
    proximaFaixa = proximaFaixa + 1;

    if (proximaFaixa > 5) {
      proximaFaixa = 0;
    }

    tempoObstaculo = 0;
  }
}

function moverObstaculos() {
  // Percorre o array dos obstaculos
  for (let i = 0; i < obstaculos.length; i = i + 1) {
    obstaculos[i].y = obstaculos[i].y + obstaculos[i].velocidade * (deltaTime / 1000);
  }
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
  textSize(34);
  text("GAME OVER", 285, 170);

  textSize(24);
  text("Pontuacao final: " + pontuacao, 260, 240);
  text("Melhor pontuacao: " + melhorPontuacao, 240, 285);
  text("Pressione ESPACO para reiniciar", 190, 340);
}

function verificarReinicio() {
  // Reinicia o jogo quando uma tecla de acao e pressionada
  if (teclaDeAcaoPressionada()) {
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
  tempoObstaculo = 0;
  tempoPontuacao = 0;
  pontuacao = 0;
  proximaFaixa = 0;
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
