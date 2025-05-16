import { state } from './store.js'
import { music } from './audio.js'
import { handleLetter } from './gameLogic.js'
import { drawFinalPart } from './draw.js'
import { startGame } from './game.js'

export function bindLetterButtons() {
    document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!state.flag) return
            const letter = btn.textContent.toLowerCase()
            handleLetter(letter)
            disableSameLetters(letter)
        })
    })
}

export function disableSameLetters(letter) {
    document.querySelectorAll('.button').forEach(b => {
        if (b.textContent.toLowerCase() === letter) b.disabled = true
    })
}

export function resetButtons() {
    document.querySelectorAll('.button').forEach(b => (b.disabled = false))
}

export function updateWord() {
    document.getElementById('word').textContent = state.guess.join(' ')
}

export function updateLives(lifes) {
    document.getElementById('result').textContent = `Осталось жизней: ${lifes}`
}

export function checkGameState() {
    if (state.guess.join('') === state.secret) {
        document.getElementById('result').textContent = `${state.name}, ты выиграл!`
        saveScore(state.name, true)
        music(2)
        state.flag = false
        setTimeout(startGame, 2500)
    } else if (state.lifes === 0) {
        document.getElementById('result').textContent = `${state.name}, ты проиграл!`
        saveScore(state.name, false)
        music(0)
        state.flag = false
        drawFinalPart()
        setTimeout(startGame, 2500)
    }
}

export function saveScore(name, won) {
    const scores = JSON.parse(localStorage.getItem('hangmanScores') || '[]')
    scores.push({ name, won, date: new Date().toLocaleString() })
    localStorage.setItem('hangmanScores', JSON.stringify(scores))
}

let isScoresVisible = false

export function showScores() {
    const scores = JSON.parse(localStorage.getItem('hangmanScores') || '[]')

    const list = document.getElementById('score-list')
    const recordsHeader = document.getElementById('records')

    if (!list || !recordsHeader) return

    isScoresVisible = !isScoresVisible

    if (isScoresVisible) {
        recordsHeader.classList.replace('nactive', 'active')
        list.classList.replace('nactive', 'active')
    } else {
        recordsHeader.classList.replace('active', 'nactive')
        list.classList.replace('active', 'nactive')
    }

    list.innerHTML = ''

    const topWins = scores
        .filter(s => s.won) 
        .sort((a, b) => new Date(a.date) - new Date(b.date))  
        .slice(0, 10)  

    if (topWins.length === 0) {
        const li = document.createElement('li')
        li.textContent = 'Нет победных игр'
        list.appendChild(li)
        return
    }

    topWins.forEach((score, index) => {
        const li = document.createElement('li')
        li.textContent = `${index + 1}. ${score.name} — Победа (${score.date})`
        list.appendChild(li)
    })
}


export function change() {
    music(1)
    resetButtons()
    document.getElementById('gallow').classList.replace('nactive', 'active')
    document.getElementById('word').classList.replace('nactive', 'active')
    document.getElementById('result').classList.replace('nactive', 'active')
    const screenWidth = window.screen.width
    if (screenWidth < 768) {
        document.getElementById('table2').classList.replace('nactive', 'active')
    } else {
        document.getElementById('table').classList.replace('nactive', 'active')
    }
    document.getElementById('change').style = 'display:none'
    document.getElementById('gallow1').style = 'display:none'
    document.getElementById('hangman').classList.replace('nactive', 'active')
    document.getElementById('back').classList.replace('nactive', 'active')
    document.getElementById('show-scores').classList.replace('active', 'nactive')
    document.getElementById('records').classList.replace('active', 'nactive')
    document.getElementById('score-list').classList.replace('active', 'nactive')
    document.getElementById('select').classList.replace('active', 'nactive')
    document.getElementById('choose_lifes').classList.replace('active', 'nactive')
    document.getElementById('choose_name').classList.replace('active', 'nactive')
    document.getElementById('input_name').classList.replace('active', 'nactive')
}

export function change2() {
    music(1)
    document.getElementById('gallow').classList.replace('active', 'nactive')
    document.getElementById('word').classList.replace('active', 'nactive')
    document.getElementById('result').classList.replace('active', 'nactive')
    const screenWidth = window.screen.width
    if (screenWidth < 768) {
        document.getElementById('table2').classList.replace('active', 'nactive')
    } else {
        document.getElementById('table').classList.replace('active', 'nactive')
    }
    document.getElementById('back').classList.replace('active', 'nactive')
    document.getElementById('show-scores').classList.replace('nactive', 'active')
    document.getElementById('hangman').classList.replace('active', 'nactive')
    document.getElementById('change').style = 'display:flexbox'
    document.getElementById('gallow1').style = 'display:flexbox'
    document.getElementById('select').classList.replace('nactive', 'active')
    document.getElementById('choose_lifes').classList.replace('nactive', 'active')
    document.getElementById('choose_name').classList.replace('nactive', 'active')
    document.getElementById('input_name').classList.replace('nactive', 'active')
}