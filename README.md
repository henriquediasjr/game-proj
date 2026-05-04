# Projeto com p5.js

ALUNOS: Henrique Dias de Carvalho Junior

Este projeto foi feito em JavaScript com p5.js e foi separado em duas partes:

1. **Game simples:** um jogo de desviar de obstaculos.
2. **Experiencia interativa:** cliques criam circulos coloridos na tela.

O objetivo foi manter o codigo com cara de iniciante, simples de explicar em sala e usando ideias basicas.

## Arquivos do projeto

- `index.html` - abre o jogo.
- `sketch.js` - codigo do jogo.
- `experiencia.html` - abre a experiencia interativa.
- `experiencia.js` - codigo da experiencia interativa.

## Como rodar

Voce pode testar de dois jeitos:

1. Abrir `index.html` direto no navegador e jogar.
2. Rodar um servidor simples na pasta do projeto:

```bash
python -m http.server 8000
```

Depois abra:

- `http://localhost:8000/index.html`
- `http://localhost:8000/experiencia.html`

## Parte 1 - Game simples

### O que o jogo faz

- Mostra uma tela inicial.
- Cria um jogador com `rect()`.
- Move o jogador com o teclado usando `keyIsDown()`.
- Cria obstaculos com um `array`.
- Usa `push()` para adicionar novos obstaculos.
- Faz os obstaculos carem do topo.
- Detecta colisao com um `if` simples.
- Aumenta a pontuacao com o tempo.
- Mostra tela de game over.
- Reinicia o jogo.

### Como explicar o jogo na apresentacao

- **`setup()`**: roda uma vez e cria a tela com `createCanvas()`.
- **`draw()`**: e o loop principal. Ele redesenha tudo varias vezes por segundo.
- **Objeto simples do jogador**: guarda `x`, `y`, tamanho e velocidade.
- **Array de obstaculos**: guarda todos os obstaculos que caem.
- **`push()`**: adiciona um novo obstaculo no array.
- **`for`**: percorre o array para mover, desenhar e testar colisao.
- **`if` de colisao**: verifica se o jogador encostou no obstaculo.
- **`deltaTime`**: deixa o movimento mais suave e independente do computador.

### Etapas do game

#### Etapa 1 - Criar `setup()` e tela inicial

Explicacao simples:

Aqui a ideia foi criar a tela e desenhar a primeira cena. Isso mostra para o professor que o projeto ja tem uma base. O `draw()` fica repetindo a tela inicial o tempo todo.

Conceitos usados:

- `setup()`
- `draw()`
- `createCanvas()`
- `rect()`
- `circle()`
- `line()`
- `fill()`
- `stroke()`
- `strokeWeight()`
- coordenadas `(x, y)`

Mensagem de commit sugerida:

`cria tela inicial com setup e draw`

#### Etapa 2 - Criar jogador parado

Explicacao simples:

O jogador foi feito com um objeto simples. Isso ajuda a guardar a posicao e o tamanho em um lugar so.

Conceitos usados:

- objeto simples `{x, y, largura, altura, velocidade}`
- `rect()`

Mensagem de commit sugerida:

`cria jogador parado`

#### Etapa 3 - Adicionar movimento com teclado

Explicacao simples:

O jogador se move com as setas. O `deltaTime` foi usado para o movimento ficar mais suave.

Conceitos usados:

- `keyIsDown()`
- `if`
- `deltaTime`

Mensagem de commit sugerida:

`adiciona movimento com teclado`

#### Etapa 4 - Criar obstaculos com array

Explicacao simples:

Os obstaculos ficam dentro de um array. Sempre que chega a hora de nascer um novo, usamos `push()` para colocar mais um obstaculo la dentro.

Conceitos usados:

- array
- `push()`
- objeto simples

Mensagem de commit sugerida:

`cria obstaculos com array`

#### Etapa 5 - Fazer obstaculos cairem

Explicacao simples:

Cada obstaculo tem um `y`. No `draw()`, esse `y` aumenta e o obstaculo parece cair na tela.

Conceitos usados:

- `for`
- variaveis simples
- `deltaTime`

Mensagem de commit sugerida:

`faz obstaculos cairem`

#### Etapa 6 - Detectar colisao

Explicacao simples:

Aqui entra o `if` mais importante do jogo. Ele compara a area do jogador com a area de cada obstaculo.

Conceitos usados:

- `if`
- `&&`

Mensagem de commit sugerida:

`adiciona colisao simples`

#### Etapa 7 - Criar pontuacao

Explicacao simples:

A pontuacao sobe com o tempo. Isso foi feito contando o tempo dentro do `draw()`.

Conceitos usados:

- variaveis simples
- `deltaTime`
- `if`

Mensagem de commit sugerida:

`adiciona pontuacao com o tempo`

#### Etapa 8 - Criar tela de game over

Explicacao simples:

Quando acontece a colisao, o estado muda para `gameover`. A partir dai o `draw()` mostra outra tela.

Conceitos usados:

- variavel de estado
- `if / else`

Mensagem de commit sugerida:

`cria tela de game over`

#### Etapa 9 - Reiniciar jogo

Explicacao simples:

No reinicio, as variaveis voltam para o valor inicial. Isso faz o jogo recomecar do zero.

Conceitos usados:

- variaveis simples
- array vazio
- `if`

Mensagem de commit sugerida:

`adiciona reinicio do jogo`

## Parte 2 - Experiencia interativa

### O que a experiencia faz

- Mostra uma tela de instrucoes.
- Usa o mouse para interagir.
- Cada clique cria um novo circulo.
- Os circulos ficam guardados em um array.
- As cores mudam com `map()`.
- Os circulos crescem de forma suave com `lerp()`.
- Linhas ligam os circulos e deixam a arte mais interessante.

### Como explicar a experiencia na apresentacao

- **Array de circulos**: guarda tudo o que foi criado pelo usuario.
- **`push()`**: coloca um novo circulo no array.
- **`map()`**: transforma a posicao do mouse em valores de cor e tamanho.
- **`lerp()`**: faz o crescimento do circulo acontecer aos poucos.
- **`mouseX` e `mouseY`**: dizem onde o mouse esta.
- **`mouseIsPressed`**: detecta o clique.

### Etapas da experiencia

#### Etapa 1 - Tela de instrucoes

Explicacao simples:

Primeiro aparece uma tela explicando o que fazer. Isso ajuda quem abre o projeto pela primeira vez.

Mensagem de commit sugerida:

`cria tela de instrucoes da experiencia`

#### Etapa 2 - Clique cria circulos

Explicacao simples:

Cada clique cria um objeto novo com `x`, `y`, tamanho e cor. Esse objeto entra no array com `push()`.

Mensagem de commit sugerida:

`adiciona circulos por clique`

#### Etapa 3 - Usar `map()` para cores

Explicacao simples:

O `map()` pega a posicao do mouse e transforma isso em numero de cor. Por isso a arte muda dependendo de onde voce clica.

Mensagem de commit sugerida:

`usa map para criar cores`

#### Etapa 4 - Pequena variacao visual

Explicacao simples:

Os circulos crescem com `lerp()` e ainda recebem linhas entre eles. Isso deixa a tela mais viva sem ficar complicado.

Mensagem de commit sugerida:

`adiciona variacao visual com lerp`

#### Etapa 5 - Ajustes finais

Explicacao simples:

No final foram feitos pequenos ajustes de tela, instrucoes e botao de limpar. Isso melhora a apresentacao.

Mensagem de commit sugerida:

`faz ajustes finais da experiencia`

## Relacao direta com os conteudos da aula

Este projeto usa:

- `setup()` e `draw()`
- `createCanvas()`
- `rect()`, `circle()`, `ellipse()`, `line()`
- `fill()`, `stroke()`, `strokeWeight()`
- coordenadas `(x, y)`
- variaveis simples
- `if / else`
- operadores `&&` e `||`
- `deltaTime`
- `keyIsDown()`
- `mouseX`, `mouseY`, `mouseIsPressed`
- `map()`
- `lerp()`
- objetos simples
- arrays com `push()`
- `for` simples

## Codigo final

O codigo final completo esta nos arquivos:

- `sketch.js`
- `experiencia.js`

Esses dois arquivos foram comentados de forma simples para ficar facil de explicar em voz alta.

## Commits do projeto

Commits existentes no repositorio:

1. `cria tela inicial com setup e draw`
2. `finaliza jogo de desviar obstaculos`
3. `cria experiencia interativa com circulos`
4. `adiciona readme com explicacoes do projeto`
