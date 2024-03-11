// const GAME_HEIGHT_AREA = 600
// const GAME_WIDTH_AREA = 800
const GAME_HEIGHT_AREA = 768
const GAME_WIDTH_AREA = 1024
const canvasYLimitRate = 4
const canvasSinglePeriod = 0.043
let player1pos = ['0', '0']
let player2pos = ['0', '0']

function setContainerDivStyle() {
  var styleHeight = 'height:' + GAME_HEIGHT_AREA + 'px;'
  var styleWidth = 'width:' + GAME_WIDTH_AREA + 'px;'
  var styleValue = styleHeight + styleWidth
  document.getElementById('container').setAttribute('style', styleValue)
}

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  setContainerDivStyle()

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  createSenoid(canvas, ctx)
  // drawXAxisLine(canvas, ctx)
  setPlayerPosition(ctx)
})

function setPlayerPosition(context) {
  var playerSquareSize = 4

  context.fillStyle = '#FF0000'
  context.fillRect(
    player1pos[0],
    player1pos[1],
    playerSquareSize,
    playerSquareSize
  )

  context.fillStyle = '#0000FF'
  context.fillRect(
    player2pos[0],
    player2pos[1],
    playerSquareSize,
    playerSquareSize
  )
}

function toDegrees(angle) {
  return angle * (180 / Math.PI)
}

function createSenoid(cnv, context) {
  var width = cnv.width
  var height = cnv.height
  var amplitude = height / canvasYLimitRate // Altura máxima da onda a partir do centro
  var frequency = canvasSinglePeriod // Frequência da onda
  var ruido = 5
  var gRuido = 0

  // Configura a cor da linha
  context.strokeStyle = '#007bff' // Cor azul, por exemplo
  context.lineWidth = 1
  context.beginPath()

  // Desenha a senoide
  for (var x = 0; x < width; x++) {
    // Calcula o valor y usando a função Math.sin
    var y = height / 2 + amplitude * Math.sin(x * frequency)
    var playerJustDrawed = 0

    if (x > 0 && Math.trunc(y) == Math.trunc(height / 2)) {
      if (x < width / 2 && player1pos[0] == 0) {
        playerJustDrawed = 1
        player1pos[0] = x - 2
        player1pos[1] = y
      } else if (x > width / 2 && player2pos[0] == 0) {
        playerJustDrawed = 1
        player2pos[0] = x - 2
        player2pos[1] = y
      }
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
