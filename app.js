const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#c33124', '#f9de59', '#a1dffb', '#f98365', '#528c83']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click',  event => {
  if(event.target.classList.contains('circle')) {
    score++
    const style = getComputedStyle(event.target);
    board.style.boxShadow = `0px 0px 20px ${style.backgroundColor}`;
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if(time === 0) {
    finishGame()
  } else {
    let current = --time
    if(current < 10 ) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1> <br>`
  board.innerHTML += ` <a href=""> Restart</a>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const color = getRandomColor()

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = `${color}`
  circle.style.boxShadow = `0px 0px 5px 1px ${color}`;
  board.append(circle)
}

function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}