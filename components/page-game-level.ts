import cards from './game-cards'
import { renderRadioComponents } from './level-game-pages'

export function initRenderLevelGame(difficulty: string) {
    const app = document.getElementById('app') as HTMLInputElement
    let memoryTimeoutId: ReturnType<typeof setTimeout>
    let formattedTime: ReturnType<typeof setTimeout>
    const shuffledCards = shuffle([...cards, ...cards])
    const appHtml = `
    <div class="top-container center">
  <header class="container">
           <div class="head__box">
          <span class="head__time-new">min </span>
          <span class="head__time-new">sek</span>
          </div> 
          <div class="head"> 
          <span class="head__time" id="seconds">00.00</span>
          <button id="start-button" class="nav__button">Начать заново</button>
          </div> 
          </header>
    <div id="card" class="cards">
     ${renderCards(difficulty, shuffledCards)}
       </div>
       </header>
       </div>
       `
    app.innerHTML = appHtml

    const cardElements = document.querySelectorAll('.card')

    cardElements.forEach((card) => {
        card.addEventListener('click', (event) =>
            flipCard(event, timerInterval, formattedTime),
        )
    })

    memoryTimeoutId = setTimeout(() => {
        cardElements.forEach((card) => {
            card.classList.remove('flipped')
        })
    }, 5000)

    cardElements.forEach((card) => {
        card.classList.add('flipped')
    })

    const startTime = new Date().getTime()

    const headTime = document.querySelector('.head__time') as HTMLInputElement
    const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime()
        const elapsedTime = currentTime - startTime
        const minutes = Math.floor(elapsedTime / 60000)
        const seconds = Math.floor((elapsedTime % 60000) / 1000)
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}`
        headTime.textContent = formattedTime
    }, 1000)

    const startButton = document.getElementById(
        'start-button',
    ) as HTMLInputElement
    startButton.addEventListener('click', () => {
        clearInterval(timerInterval)
        clearTimeout(memoryTimeoutId)
        cardElements.forEach((card) => {
            card.classList.remove('flipped')
        })
        initRenderLevelGame(difficulty)
    })

    function renderCards(difficulty: string, cards: Array<string>) {
        const numCards = getNumCards(difficulty) * 2
        const selectedCards = cards.slice(0, Math.floor(numCards / 2))
        const duplicatedCards = [...selectedCards, ...selectedCards]
        const shuffledCards = shuffle(duplicatedCards)
        let cardsHtml = ''
        for (let i = 0; i < shuffledCards.length; i++) {
            const card = shuffledCards[i]
            const cardHtml = `
    <div data-card-name="${card.name}" class="card">
      <div  class="card__back">
        <img src="${card.front}" alt="">
      </div>
      <div class="card__front">
        <img src="${card.back}" alt="">
      </div>
    </div>
  `
            cardsHtml += cardHtml
        }
        return cardsHtml
    }
}

function shuffle(array: Array<any>) {
    let currentIndex = array.length,
        randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}
function getNumCards(difficulty: string) {
    switch (difficulty) {
        case 'easy':
            return 6
        case 'medium':
            return 12
        case 'hard':
            return 18
        default:
            return 6
    }
}

let currentCard: any = null
let previousCard: any = null
let isFlippingCards: boolean = false
let gameResult

function flipCard(
    event: any,
    timerInterval:  ReturnType<typeof setTimeout>,
    formattedTime: ReturnType<typeof setTimeout>,
) {
     if (isFlippingCards) {
        // Игнорируем клики, если уже переворачиваем карты
        return
    }
    const card = event.currentTarget

    if (card.classList.contains('flipped')) {
        return
    }
    if (currentCard === null) {
        currentCard = card
        card.classList.toggle('flipped')
    } else if (previousCard === null && currentCard !== card) {
        previousCard = card
        card.classList.toggle('flipped')
        isFlippingCards = true
        const currentCardFront =
            currentCard.querySelector('.card__front img').src
        const previousCardFront =
            previousCard.querySelector('.card__front img').src
        if (currentCardFront === previousCardFront) {
            currentCard.isMatched = true
            previousCard.isMatched = true

            const allCards = document.querySelectorAll('.card')
            const allMatched = Array.prototype.slice
                .call(allCards)
                .every((card) => card.isMatched)
            if (allMatched) {
                gameResult = true
                let formattedTime =
                    document.querySelector('.head__time')?.textContent
                clearInterval(timerInterval)
                renderWinPage(formattedTime, true)
            }

            currentCard = null
            previousCard = null
            isFlippingCards = false
        } else {
            gameResult = false
            let formattedTime =
                document.querySelector('.head__time')?.textContent
            clearInterval(timerInterval)
            renderWinPage(formattedTime, false)
            setTimeout(() => {
                clearInterval(timerInterval)
                currentCard.classList.remove('flipped')
                previousCard.classList.remove('flipped')
                currentCard = null
                previousCard = null
                isFlippingCards = false
            }, 1000)
        }
    }
}

function renderWinPage(formattedTime: any, gameResult: boolean) {
    const app = document.querySelector('#app') as HTMLInputElement
    const winPageHtml = `
    <div class="fin__page">
        <div class="window__fin_game">
            <div class="window__fin_game2">
                ${
                    gameResult
                        ? '<span class="window__fin_imgwin"></span>'
                        : '<span class="window__fin_imgconq"></span>'
                }
                <div class="window__fin_"> 
                    <p class="window__fin_text">${
                        gameResult ? 'Вы выиграли!' : 'Вы проиграли!'
                    }</p>
                </div> 
                <div class="window__fin_tex"> 
                    <p class="window__fin_text2">Затраченное время:</p>
                    <div>
                    <p class="window__fin_time">${formattedTime}</p>  
                </div>          
                    <button id="restart-button" class="nav__button">Играть снова</button>
                </div>
            </div>
        </div>
    </div>
  `
    app.innerHTML = winPageHtml

    const reStartGame = document.querySelector(
        '#restart-button',
    ) as HTMLInputElement

    reStartGame.addEventListener('click', () => {
        reStartGameButton()
    })

    function reStartGameButton() {
        renderRadioComponents()
    }
}
