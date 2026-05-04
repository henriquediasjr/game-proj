// Guarda em qual tela o jogo esta
let estadoJogo = "inicio";

function setup() {
  // Cria a area do jogo
  createCanvas(800, 500);
}

function draw() {
  // Verifica qual tela deve aparecer
  if (estadoJogo === "inicio") {
    telaInicial();
  } else {
    // Esta parte fica pronta para as proximas etapas
    strokeWeight(0);
    fill(0);
    rect(0, 0, 800, 500);
  }
}

function telaInicial() {
  // Fundo da tela feito com um retangulo grande
  strokeWeight(0);
  fill(20, 30, 70);
  rect(0, 0, 800, 500);

  // Moldura principal
  stroke(255);
  strokeWeight(4);
  fill(40, 60, 130);
  rect(100, 80, 600, 340);

  // Retangulo menor para destacar o titulo
  fill(70, 100, 190);
  rect(170, 130, 460, 90);

  // Cor do texto
  fill(255);
  strokeWeight(1);

  // Titulo simples do jogo
  text("DESVIE DOS OBSTACULOS", 250, 175);

  // Instrucao principal da tela inicial
  text("Pressione qualquer tecla", 285, 280);

  // Linha visual na parte de baixo
  stroke(255);
  strokeWeight(3);
  line(220, 340, 580, 340);

  // Detalhe com circulos para deixar a tela mais viva
  fill(255, 220, 80);
  circle(220, 370, 25);
  circle(400, 370, 25);
  circle(580, 370, 25);
}
