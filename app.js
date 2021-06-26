const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
//const colors = ['#ff3caa', '#ffea35', '#3d5c23', '#163c9f', '#16cddb']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
	event.preventDefault() //отменяет поведение начать игру
	screens[0].classList.add('up') //обращемся к первому скрину, чтобы при клике появился 2 экран
})

timeList.addEventListener('click', event => //делигирование событии
{ 
	//target-элемент по котрому кликнули, contains-проверят есть ли у этого элемента определенный клас
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time')) //parseInt чтобы строчку оборачиваем в число
		screens[1].classList.add('up') //обращемся ко второму скрину, чтобы при клике появился 3 экран
		startGame()
	}
})

board.addEventListener('click', event => {
	//обработка клика по кружочку
	if (event.target.classList.contains('circle')) { 
		score++ //увеливаем счет игры
		event.target.remove() //убираем кружок которую кликнули 
		createRandomCircle() //и создаем новую
		
	}
})

function startGame() {
	setInterval(decreaseTime, 1000) //через каждый промежуток времени которую зададим будет выполнять функцию 
	createRandomCircle()
	setTime(time)
}

function decreaseTime() { 
	if (time ===0) { //время уже вышло и продолжать игру не сможем
		finishGame()
	} else { //если время > 0, то вызываем функцию
		let current = --time //каждую сек уменьшаем время 
		//добавление 0 перед сек 9,8,7...
		if (current < 10) {
		current = `0${current}`
	}
	setTime(current)
	}
}

//helper функция, чтобы не повторять функционал
function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.remove() //убирает 2скрин вместе с заголовком h3
	//добавляем заголовок что игра закончена
	board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() { //рандомный кружок для кликания
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60) //ширина и высота для кружочка будет одинаковой от 10 до 60px
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size) //мин знач 0 и макс знач в дипазоне котрую задали
	const y = getRandomNumber(0, height - size)
	

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px` //по горизонтали распол

	board.append(circle)
}

function getRandomNumber(min, max) { //случайно получает размерности в диапазоне
	return Math.round(Math.random() * (max-min) + min)
}

function winTheGame() { //убивает кружочки те, котрые создаем
	function kill() {
		const circle = document.querySelector('.circle')
		
		if (circle) {
			circle.click()
		}
	}
	setInterval(kill, 75)
}

