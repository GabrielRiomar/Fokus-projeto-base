const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const startPauseSpan = document.querySelector('#start-pause span')
const startPauseImg = document.querySelector('#start-pause img')
const musicFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null
startPauseBt.addEventListener('click', () => {
  iniciarOuPausar()
})

const audio = new Audio('/sons/luna-rise-part-one.mp3')
const end = new Audio('/sons/beep.mp3')
const start = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')

audio.loop = true

musicFocoInput.addEventListener('change', () => {
  playAudio()
})

focoButton.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500
  handleClick('foco')
  focoButton.classList.add('active')
})
curtoButton.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300
  handleClick('descanso-curto')
  curtoButton.classList.add('active')
})
longoButton.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 600
  handleClick('descanso-longo')
  longoButton.classList.add('active')
})

const handleClick = contexto => {
  mostrarTempo()
  buttons.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `/imagens/${contexto}.png`)
  switch (contexto) {
    case 'foco':
      title.innerHTML = `
      Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break

    case 'descanso-curto':
      title.innerHTML = `
      Que tal dar uma respirada?<br />
      <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `
      break

    case 'descanso-longo':
      title.innerHTML = `
      Hora de voltar à superfície.<br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `
      break

    default:
      break
  }
}

const playAudio = () => {
  if (audio.paused) {
    audio.play()
  } else {
    audio.pause()
  }
}

const startSound = () => {
  if (start.paused) {
    start.play()
  } else {
    start.pause()
  }
}

const pauseSound = () => {
  if (pause.paused) {
    pause.play()
  } else {
    pause.pause()
  }
}

const endSound = () => {
  if (end.paused) {
    end.play()
  } else {
    end.pause()
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    endSound()
    alert('Fim')
    zerar()
    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
  // console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

function iniciarOuPausar() {
  if (intervaloId) {
    pauseSound()
    zerar()
    return
  }
  startSound()
  startPauseImg.setAttribute('src', `/imagens/pause.png`)
  startPauseSpan.textContent = 'Pausar'
  intervaloId = setInterval(() => {
    contagemRegressiva()
  }, 1000)
}

function zerar() {
  clearInterval(intervaloId)
  startPauseImg.setAttribute('src', `/imagens/play_arrow.png`)
  startPauseSpan.textContent = 'Começar'
  intervaloId = null
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
    minute: '2-digit',
    second: '2-digit'
  })
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
