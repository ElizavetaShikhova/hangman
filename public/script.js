'use strict';

let canvas, ctx
let lifes, lifesInit, secret, guess, flag = true

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('hangman')
    ctx = canvas.getContext('2d')
    bindLetterButtons()
    document.getElementById('change').onclick = startGame
    document.getElementById('back').onclick = change2
})

async function fetchWord() {
    const res = await fetch('/api/word')
    const { word } = await res.json()
    return word.toLowerCase()
}

function bindLetterButtons() {
    document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!flag) return
            const letter = btn.textContent.toLowerCase()
            handleLetter(letter)
            disableSameLetters(letter)
        })
    })
}

function disableSameLetters(letter) {
    document.querySelectorAll('.button').forEach(b => {
        if (b.textContent.toLowerCase() === letter) b.disabled = true
    })
}

function resetButtons() {
    document.querySelectorAll('.button').forEach(b => (b.disabled = false))
}

async function startGame() {
    const select = document.getElementById('select')
    lifes = lifesInit = +select.value
    if (lifes === -1) lifes = lifesInit = 8

    resetButtons()

    secret = await fetchWord()
    guess = Array.from(secret, () => '_')
    guess[0] = secret[0]
    guess[secret.length - 1] = secret.at(-1)
    flag = true
    drawInitialGallow()
    updateWord()
    updateLives()
    change()
}

function handleLetter(letter) {
    if (secret.includes(letter)) {
        [...secret].forEach((c, i) => {
            if (c === letter) guess[i] = c
        })
    } else {
        lifes--
        updateLives()
        drawNextPart()
    }
    updateWord()
    checkGameState()
    music(1)
}

function updateWord() {
    document.getElementById('word').textContent = guess.join(' ')
}

function updateLives() {
    document.getElementById('result').textContent = `Осталось жизней: ${lifes}`
}

function checkGameState() {
    if (guess.join('') === secret) {
        document.getElementById('result').textContent = 'Ты выиграл!'
        music(2)
        flag = false
        setTimeout(startGame, 2500)
    } else if (lifes === 0) {
        document.getElementById('result').textContent = 'Ты проиграл!'
        music(0)
        flag = false
        drawFinalPart()
        setTimeout(startGame, 2500)
    }
}

function drawInitialGallow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawNextPart() {
    if (lifesInit === 8) {
        if (lifes === 7) { draw_gallow1(); draw_gallow0() }
        else if (lifes === 6) draw_gallow2()
        else if (lifes === 5) draw_head()
        else if (lifes === 4) draw_body()
        else if (lifes === 3) draw_hand1()
        else if (lifes === 2) draw_hand2()
        else if (lifes === 1) draw_leg1()
    } else if (lifesInit === 9) {
        if (lifes === 8) draw_gallow0()
        else if (lifes === 7) draw_gallow1()
        else if (lifes === 6) draw_gallow2()
        else if (lifes === 5) draw_head()
        else if (lifes === 4) draw_body()
        else if (lifes === 3) draw_hand1()
        else if (lifes === 2) draw_hand2()
        else if (lifes === 1) draw_leg1()
    } else if (lifesInit === 7) {
        if (lifes === 6) { draw_gallow0(); draw_gallow1(); draw_gallow2() }
        else if (lifes === 5) draw_head()
        else if (lifes === 4) draw_body()
        else if (lifes === 3) draw_hand1()
        else if (lifes === 2) draw_hand2()
        else if (lifes === 1) draw_leg1()
    } else if (lifesInit === 6) {
        if (lifes === 5) { draw_gallow0(); draw_gallow1(); draw_gallow2() }
        else if (lifes === 4) { draw_body(); draw_head() }
        else if (lifes === 3) draw_hand1()
        else if (lifes === 2) draw_hand2()
        else if (lifes === 1) draw_leg1()
    }
}

function drawFinalPart() { draw_leg2() }

function draw_gallow0() {
    ctx.beginPath()
    ctx.moveTo(355, 7)
    ctx.lineTo(355, 480)
    ctx.lineWidth = 7
    ctx.stroke()
}

function draw_gallow1() {
    ctx.beginPath()
    ctx.moveTo(270, 480)
    ctx.lineTo(440, 480)
    ctx.lineWidth = 7
    ctx.stroke()
}

function draw_gallow2() {
    ctx.beginPath()
    ctx.moveTo(358, 7)
    ctx.lineTo(57, 7)
    ctx.lineWidth = 7
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(60, 7)
    ctx.lineTo(60, 45)
    ctx.lineWidth = 7
    ctx.stroke()
}

function draw_head() {
    ctx.beginPath()
    ctx.arc(60, 82, 40, 0, 2 * Math.PI, false)
    ctx.lineWidth = 7
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(50, 74, 2, 0, 2 * Math.PI, false)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(70, 74, 2, 0, 2 * Math.PI, false)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(51, 96)
    ctx.lineTo(69, 98)
    ctx.lineWidth = 5
    ctx.stroke()
}

function draw_body() {
    ctx.beginPath()
    ctx.moveTo(60, 122)
    ctx.lineTo(60, 250)
    ctx.lineWidth = 7
    ctx.stroke()
}

function draw_hand1() {
    ctx.beginPath()
    ctx.moveTo(60, 122)
    ctx.lineTo(30, 176)
    ctx.lineWidth = 6
    ctx.stroke()
}

function draw_hand2() {
    ctx.beginPath()
    ctx.moveTo(60, 122)
    ctx.lineTo(90, 176)
    ctx.lineWidth = 6
    ctx.stroke()
}

function draw_leg1() {
    ctx.beginPath()
    ctx.moveTo(60, 250)
    ctx.lineTo(30, 305)
    ctx.lineWidth = 7
    ctx.stroke()
}

function draw_leg2() {
    ctx.beginPath()
    ctx.moveTo(60, 250)
    ctx.lineTo(90, 305)
    ctx.lineWidth = 7
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(43, 69)
    ctx.lineTo(57, 79)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(43, 79)
    ctx.lineTo(57, 69)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(63, 69)
    ctx.lineTo(77, 79)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(63, 79)
    ctx.lineTo(77, 69)
    ctx.lineWidth = 5
    ctx.stroke()
}

function music(s) {
    const audio = new Audio()
    if (s === 1) {
        audio.src = 'click.mp3'
    } else if (s === 0) {
        audio.src = 'game_over.mp3'
    } else if (s === 2) {
        audio.src = 'win.mp3'
    }
    audio.autoplay = true
}

function change() {
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
    document.getElementById('select').classList.replace('active', 'nactive')
    document.getElementById('choose_lifes').classList.replace('active', 'nactive')
}

function change2() {
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
    document.getElementById('hangman').classList.replace('active', 'nactive')
    document.getElementById('change').style = 'display:flexbox'
    document.getElementById('gallow1').style = 'display:flexbox'
    document.getElementById('select').classList.replace('nactive', 'active')
    document.getElementById('choose_lifes').classList.replace('nactive', 'active')
}
