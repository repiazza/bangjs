// const gameSettings.canvas.WIDTH_AREA = 800
// const gameSettings.canvas.HEIGHT_AREA = 600
// const gameSettings.canvas.Y_LIMIT = 4
// const gameSettings.canvas.SENOID_PERIOD = 0.01

// let gameSettings.landscape.CURVE_AMPLITUDE = 0
// const gameSettings.landscape.LINE_WIDTH = 1

// /**
//  * @constant {number} @default 0
//  */
// export const WEST = 0
// /**
//  * @constant {number} @default 1
//  */
// export const EAST = 1
// /**
//  * @constant {number} @default 2
//  */
// export const NORTH = 2
// /**
//  * @constant {number} @default 3
//  */
// export const SOUTH = 3
// /**
//  * @constant {Array} @default [ WEST NORTH ]
//  */
// export const NORTH_WEST = [WEST, NORTH]
// /**
//  * @constant {Array} @default [ EAST NORTH ]
//  */
// export const NORTH_EAST = [EAST, NORTH]
// /**
//  * @constant {Array} @default [ WEST SOUTH ]
//  */
// export const SOUTH_WEST = [WEST, SOUTH]
// /**
//  * @constant {Array} @default [ EAST SOUTH ]
//  */
// export const SOUTH_EAST = [EAST, SOUTH]

const gameSettings = {
  canvas: {
    WIDTH_AREA: 1920,
    HEIGHT_AREA: 1080,
    Y_LIMIT: 4,
    SENOID_PERIOD: 0.01,
  },
  landscape: {
    CURVE_AMPLITUDE: 0,
    LINE_WIDTH: 1,
  },
  players: {
    SQUARE_SIZE: 16,
    COUNT_LIMIT: 5,
    DEFAULT_COLORS: [
      '0xFF0000',
      '0x00FF00',
      '0x0000FF',
      '0xFFA500',
      '0xFF1155',
    ],
  },
}
const PLAYER_COLORS = gameSettings.players.DEFAULT_COLORS

const gameState = {
  playerNumber: 0,
  players: [],
  createPlayers: function () {
    for (let i = 0; i < this.playerNumber; i++) {
      const name = `Player${i + 1}`
      const color = PLAYER_COLORS[i]

      this.players.push({
        name,
        color,
        positions: {
          x: 0,
          y: 0,
        },
      })
    }
  },
  setPlayersPosition: function (playerIdx, xPos, yPos) {
    this.players[playerIdx].x = xPos
    this.players[playerIdx].y = yPos
  },
}

function generatePlayerPosByQuantity() {}

function atualizarPosicoes(context, compressaoPixels, angulo) {
  const gPixels = 9.81 * 8 // Gravidade em pixels/s²
  const massa = 0.1 // Massa do projétil em kg
  const compressaoMetros = compressaoPixels / 8 // Converte a compressão para metros
  const k = 1.1 // Constante da mola em N/m
  const intervaloTempo = 0.1 // Intervalo de tempo para atualização em segundos

  // Calcula a velocidade inicial em metros/s e converte para pixels/s
  let velocidadeInicialMetros = Math.sqrt((k * compressaoMetros ** 2) / massa)
  let velocidadeInicialPixels = velocidadeInicialMetros * 8

  // Convertendo o ângulo para radianos
  let anguloRadianos = (angulo * Math.PI) / 180

  // Calculando componentes da velocidade inicial
  let vx = velocidadeInicialPixels * Math.cos(anguloRadianos) // Velocidade inicial em x
  let vy = velocidadeInicialPixels * Math.sin(anguloRadianos) // Velocidade inicial em y

  console.log(
    `Velocidade inicial em x: ${vx} pixels/s, Velocidade inicial em y: ${vy} pixels/s`
  )

  let t = 0 // Tempo inicial
  let y = 0 // Inicializando y para entrar no loop

  // Loop para atualizar e imprimir posições a cada 0.1s

  context.beginPath()
  context.strokeStyle = '#FF0000' // Laranja Conecto
  context.moveTo(0, 0)
  while (y >= 0) {
    // Continua até o projétil atingir o solo (y < 0)
    let x = vx * t // Posição em x no tempo t
    y = vy * t - 0.5 * gPixels * t * t // Posição em y no tempo t

    // Verifica se o projétil ainda está acima do solo

    context.lineTo(x, y)
    context.moveTo(x, y)

    if (y < 0) {
      break // Sai do loop se o projétil atingiu/ultrapassou o solo
    }

    console.log(
      `Tempo: ${t.toFixed(1)}s, Posição x: ${x.toFixed(2)} pixels, Posição y: ${y.toFixed(2)} pixels`
    )

    t += intervaloTempo // Incrementa o tempo
  }
  context.stroke()
  context.closePath()
}

// Exemplo de uso da função com uma compressão da mola em pixels e um ângulo de lançamento

function setAmplitude(cnv) {
  gameSettings.landscape.CURVE_AMPLITUDE =
    cnv.height / gameSettings.canvas.Y_LIMIT
}
function drawGrid(cnv, context) {
  var xPos = 0
  var yPos = cnv.height / 2

  var yInitPos =
    yPos -
    cnv.height / gameSettings.canvas.Y_LIMIT -
    gameSettings.players.SQUARE_SIZE
  var yFinalPos =
    yPos +
    cnv.height / gameSettings.canvas.Y_LIMIT +
    gameSettings.players.SQUARE_SIZE

  context.beginPath()
  context.strokeStyle = '#FFA500' // Laranja Conecto
  context.lineWidth = 1
  yPos = yInitPos
  for (
    xPos = 0;
    xPos < cnv.width;
    xPos += gameSettings.players.SQUARE_SIZE * 2
  ) {
    context.moveTo(xPos, yPos)
    context.lineTo(xPos, yFinalPos)
    context.stroke()
  }
  for (
    yPos = yInitPos;
    yPos < yFinalPos;
    yPos += gameSettings.players.SQUARE_SIZE * 2
  ) {
    if (yPos + gameSettings.players.SQUARE_SIZE * 2 >= yFinalPos) break
    context.moveTo(0, yPos)
    context.lineTo(cnv.width, yPos)
    context.stroke()
  }
  context.moveTo(0, yFinalPos)
  context.lineTo(cnv.width, yFinalPos)
  context.stroke()
  context.closePath()
}

function setContainerDivStyle() {
  var styleHeight = 'height:' + gameSettings.canvas.HEIGHT_AREA + 'px;'
  var styleWidth = 'width:' + gameSettings.canvas.WIDTH_AREA + 'px;'
  var styleValue = styleHeight + styleWidth
  canvas.style.width = gameSettings.canvas.WIDTH_AREA + 'px'
  canvas.style.height = gameSettings.canvas.HEIGHT_AREA + 'px'
  canvas.width = gameSettings.canvas.WIDTH_AREA * window.devicePixelRatio
  canvas.height = gameSettings.canvas.HEIGHT_AREA * window.devicePixelRatio
  document.getElementById('container').setAttribute('style', styleValue)
}

function getPlayersDetailsAndCreate() {
  // gameManager.playerNumber = window.prompt("Informe o numero de jogadores:")
  gameState.playerNumber = 2
  for (let i = 0; i < gameState.playerNumber; i++) {
    gameState.createPlayers(i + 1)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  getPlayersDetailsAndCreate()
  setContainerDivStyle()
  setAmplitude(canvas)

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawGrid(canvas, ctx)
  createSenoid(canvas, ctx)
  drawSidesCrosses(canvas, ctx)
  // drawXAxisLine(canvas, ctx)
  drawPlayer(ctx)

  atualizarPosicoes(ctx, 100, 70) // Por exemplo, 80 pixels de compressão e 45 graus de ângulo de lançamento
})

function drawPlayer(context) {
  var playerSquareSize = gameSettings.players.SQUARE_SIZE

  //   context.fillStyle = '#FF0000'
  //   context.fillRect(
  //     player1pos.x,
  //     player1pos.y,
  //     playerSquareSize,
  //     playerSquareSize
  //   )
  //
  //   context.fillStyle = '#0000FF'
  //   context.fillRect(
  //     player2pos[0],
  //     player2pos[1],
  //     playerSquareSize,
  //     playerSquareSize
  //   )
}

function toDegrees(angle) {
  return angle * (180 / Math.PI)
}

function drawSidesCrosses(cnv, context) {
  var width = cnv.width
  var height = cnv.height
  context.strokeStyle = '#ffffff' // Cor azul, por exemplo
  context.lineWidth = gameSettings.landscape.LINE_WIDTH * 5
  context.beginPath()
  context.moveTo(0, height / 2)
  context.lineTo(width, height / 2)
  context.moveTo(width / 4, 0)
  context.lineTo(width / 4, height)
  context.moveTo((width * 3) / 4, 0)
  context.lineTo((width * 3) / 4, height)
  context.stroke()
  context.closePath()
}

function createSenoid(cnv, context) {
  var width = cnv.width
  var height = cnv.height
  var amplitude = gameSettings.landscape.CURVE_AMPLITUDE // Altura máxima da onda a partir do centro
  var frequency = gameSettings.canvas.SENOID_PERIOD // Frequência da onda
  var ruido = 3
  var gRuido = 0
  var currentPlayer = 0

  // Configura a cor da linha
  context.strokeStyle = '#00FF00' // Cor azul, por exemplo
  context.lineWidth = gameSettings.landscape.LINE_WIDTH
  context.beginPath()

  // Desenha a senoide
  for (var x = 0; x < width; x++) {
    // Calcula o valor y usando a função Math.sin
    var y = height / 2 + amplitude * Math.sin(x * frequency)
    var playerJustDrawed = 0

    if (x > 0 && Math.trunc(y) == Math.trunc(height / 2)) {
      // currentPlayer++
      // if (x < width / 2 && player1pos[0] == 0) {
      //   playerJustDrawed = 1
      //   player1pos[0] = x - 2
      //   player1pos[1] = y
      // } else if (x > width / 2 && player2pos[0] == 0) {
      //   playerJustDrawed = 1
      //   player2pos[0] = x - 2
      //   player2pos[1] = y
      // }
    }
    if (!playerJustDrawed) {
      if (0) {
        // MESCLAR equacao de terreno
      } else {
        if (x % 100 == 0) gRuido = 0
        else if ((x % 50 == 0 && gRuido == 0) || gRuido == 1) {
          gRuido = 1
          y += Math.random() * ruido
        }
        // Move para o ponto inicial ou conecta os pontos com linhas
        if (x == 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
    }
    playerJustDrawed = 0
  }
  context.stroke()
  context.closePath()
}

function drawXAxisLine(cnv, context) {
  var width = cnv.width
  var height = cnv.height

  context.strokeStyle = '#ffAA00' // Cor azul, por exemplo
  context.lineWidth = 1

  context.beginPath()
  context.moveTo(0, height / 2)
  context.lineTo(width, height / 2)
  context.stroke()
  context.closePath()
}
