// Tamanho da tela
let larguraArte = 800;
let alturaArte = 500;

// Estado da experiencia
let estadoArte = "instrucoes";

// Array que guarda os circulos criados
let circulos = [];

// Guarda se o mouse estava pressionado no quadro anterior
let mouseEstavaPressionado = false;

function setup() {
  // Cria a area da experiencia
  createCanvas(larguraArte, alturaArte);
}

function draw() {
  // Escolhe qual tela deve aparecer
  if (estadoArte === "instrucoes") {
    telaDeInstrucoes();
    verificarCliqueParaComecar();
  } else if (estadoArte === "arte") {
    desenharExperiencia();
    verificarCliquesDaArte();
  }

  // Guarda o estado do mouse para detectar um clique por vez
  mouseEstavaPressionado = mouseIsPressed;
}

function telaDeInstrucoes() {
  // Fundo da tela de instrucoes
  strokeWeight(0);
  fill(25, 20, 50);
  rect(0, 0, larguraArte, alturaArte);

  // Caixa principal
  stroke(255);
  strokeWeight(4);
  fill(60, 40, 120);
  rect(110, 80, 580, 320);

  // Caixa do botao
  fill(100, 80, 200);
  rect(250, 300, 300, 60);

  // Textos da tela inicial
  fill(255);
  strokeWeight(1);
  textSize(30);
  text("EXPERIENCIA INTERATIVA", 190, 150);

  textSize(22);
  text("Clique na tela para criar circulos", 190, 220);
  text("As cores mudam com a posicao do mouse", 150, 255);
  text("CLIQUE AQUI PARA COMECAR", 235, 338);
}

function verificarCliqueParaComecar() {
  // So muda de tela quando o clique acontece pela primeira vez
  if (mouseIsPressed && mouseEstavaPressionado === false) {
    if (
      mouseX > 250 &&
      mouseX < 550 &&
      mouseY > 300 &&
      mouseY < 360
    ) {
      estadoArte = "arte";
    }
  }
}

function desenharExperiencia() {
  // Cor do fundo muda com o mouse
  let corFundoR = map(mouseX, 0, larguraArte, 20, 120);
  let corFundoG = map(mouseY, 0, alturaArte, 20, 140);
  let corFundoB = map(mouseX, 0, larguraArte, 80, 200);

  strokeWeight(0);
  fill(corFundoR, corFundoG, corFundoB);
  rect(0, 0, larguraArte, alturaArte);

  // Barra superior com instrucoes
  fill(255, 255, 255);
  rect(20, 20, 760, 50);

  fill(20, 20, 20);
  textSize(18);
  text("Clique para criar circulos coloridos", 40, 50);
  text("Clique no botao LIMPAR para recomecar", 340, 50);

  // Botao para limpar os circulos
  stroke(20, 20, 20);
  strokeWeight(2);
  fill(255, 220, 120);
  rect(650, 85, 110, 45);

  fill(20, 20, 20);
  strokeWeight(1);
  textSize(20);
  text("LIMPAR", 675, 114);

  desenharLinhas();
  desenharCirculos();
}

function verificarCliquesDaArte() {
  // Cria um novo circulo ou limpa a tela
  if (mouseIsPressed && mouseEstavaPressionado === false) {
    if (
      mouseX > 650 &&
      mouseX < 760 &&
      mouseY > 85 &&
      mouseY < 130
    ) {
      circulos = [];
    } else {
      let novoTamanho = map(mouseY, 0, alturaArte, 20, 100);
      let novaCorR = map(mouseX, 0, larguraArte, 50, 255);
      let novaCorG = map(mouseY, 0, alturaArte, 50, 255);
      let novaCorB = map(mouseX + mouseY, 0, larguraArte + alturaArte, 100, 255);

      // Guarda um novo circulo dentro do array
      circulos.push({
        x: mouseX,
        y: mouseY,
        tamanhoAtual: 10,
        tamanhoFinal: novoTamanho,
        corR: novaCorR,
        corG: novaCorG,
        corB: novaCorB
      });
    }
  }
}

function desenharLinhas() {
  // Liga um circulo ao outro para criar um desenho
  for (let i = 0; i < circulos.length - 1; i = i + 1) {
    stroke(255);
    strokeWeight(2);
    line(circulos[i].x, circulos[i].y, circulos[i + 1].x, circulos[i + 1].y);
  }
}

function desenharCirculos() {
  // Desenha todos os circulos do array
  for (let i = 0; i < circulos.length; i = i + 1) {
    // Usa lerp() para o circulo crescer aos poucos
    circulos[i].tamanhoAtual = lerp(circulos[i].tamanhoAtual, circulos[i].tamanhoFinal, 0.08);

    stroke(255);
    strokeWeight(2);
    fill(circulos[i].corR, circulos[i].corG, circulos[i].corB);
    circle(circulos[i].x, circulos[i].y, circulos[i].tamanhoAtual);

    // Circulo menor para dar uma pequena variacao visual
    fill(255);
    circle(circulos[i].x, circulos[i].y, circulos[i].tamanhoAtual / 3);
  }
}
