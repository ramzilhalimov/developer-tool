import cards from './game-cards'
import { renderRadioComponents } from './level-game-pages'

export function initRenderLevelGame(difficulty: string) {
    const app = document.getElementById('app') as HTMLInputElement
    // let formattedTime: string
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
          <button id="start-button" class="header__button">Начать заново</button>
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
            flipCard(event, timerInterval),
        )
    })

    const memoryTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
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
    interface Card {
        name: string
        front: string
        back: string
    }

    function renderCards(difficulty: string, cards: Card[]) {
        const numCards = getNumCards(difficulty) * 2
        const selectedCards = cards.slice(0, Math.floor(numCards / 2))
        const duplicatedCards = [...selectedCards, ...selectedCards]
        const shuffledCards: Card[] = shuffle(duplicatedCards)
        let cardsHtml = ''

        for (let i = 0; i < shuffledCards.length; i++) {
            const card = shuffledCards[i]
            const cardHtml = `
    <div data-card-name="${card.name}" class="card">
      <div  class="card__front">
        <img src="${card.front}" alt="">
      </div>
      <div class="card__back">
        <img src="${card.back}" alt="">
      </div>
    </div>
  `
            cardsHtml += cardHtml
        }
        return cardsHtml
    }
}

function shuffle<T>(array: Array<T>): Array<T> {
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
            return 3
        case 'medium':
            return 6
        case 'hard':
            return 9
        default:
            return 3
    }
}
interface CardElement extends HTMLElement {
    isMatched: boolean
}

let currentCard: CardElement | null = null
let previousCard: CardElement | null = null
let isFlippingCards: boolean = false

function flipCard(
    event: Event,
    timerInterval: ReturnType<typeof setTimeout>,
    // formattedTime: string,
) {
    if (isFlippingCards) {
        return
    }
    const card = event.currentTarget as CardElement

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
        const currentCardFront = currentCard
            .querySelector('.card__front img')
            ?.getAttribute('src')

        const previousCardFront = previousCard
            .querySelector('.card__front img')

            ?.getAttribute('src')

        if (currentCardFront === previousCardFront) {
            currentCard.isMatched = true
            previousCard.isMatched = true

            const allCards = document.querySelectorAll('.card')
            const allMatched = Array.prototype.slice
                .call(allCards)
                .every((card) => card.isMatched)

            if (allMatched) {
                const formattedTime =
                    document.querySelector('.head__time')?.textContent
                clearInterval(timerInterval)
                if (formattedTime) {
                    renderWinPage(formattedTime, true)
                }
            }

            currentCard = null
            previousCard = null
            isFlippingCards = false
        } else {
            const formattedTime =
                document.querySelector('.head__time')?.textContent
            clearInterval(timerInterval)
            if (formattedTime) {
                renderWinPage(formattedTime, false)
            }
            setTimeout(() => {
                clearInterval(timerInterval)
                // currentCard.classList.remove('flipped')

                // previousCard.classList.remove('flipped')
                currentCard = null
                previousCard = null
                isFlippingCards = false
            }, 1000)
        }
    }
}

function renderWinPage(formattedTime: string, gameResult: boolean) {
    const app = document.querySelector('#app') as HTMLInputElement
    const winPageHtml = `
    <div class="fin__game">
        <div class="fin__game-container">
            <div class="fin__game-nav">
                ${
                    gameResult
                        ? '<span class="fin__game_imgwin"></span>'
                        : '<span class="fin__game_imgconq"></span>'
                }
                <div class="fin__game_window"> 
                    <p class="fin__game_text">${
                        gameResult ? 'Вы выиграли!' : 'Вы проиграли!'
                    }</p>
                </div> 
                <div class="fin__game_tex"> 
                    <p class="fin__game_text2">Затраченное время:</p>
                    <div>
                    <p class="fin__game_time">${formattedTime}</p>  
                </div>          
                    <button id="restart-button" class="header__button">Играть снова</button>
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
