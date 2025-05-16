import { music } from './audio.js'
import { checkGameState } from './ui.js'
import { state } from './store.js'

export function drawInitialGallow() {
    const canvas = document.getElementById('hangman')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function drawNextPart() {
    if (state.lifesInit === 8) {
        if (state.lifes === 7) { draw_gallow1(); draw_gallow0() }
        else if (state.lifes === 6) draw_gallow2()
        else if (state.lifes === 5) draw_head()
        else if (state.lifes === 4) draw_body()
        else if (state.lifes === 3) draw_hand1()
        else if (state.lifes === 2) draw_hand2()
        else if (state.lifes === 1) draw_leg1()
    } else if (state.lifesInit === 9) {
        if (state.lifes === 8) draw_gallow0()
        else if (state.lifes === 7) draw_gallow1()
        else if (state.lifes === 6) draw_gallow2()
        else if (state.lifes === 5) draw_head()
        else if (state.lifes === 4) draw_body()
        else if (state.lifes === 3) draw_hand1()
        else if (state.lifes === 2) draw_hand2()
        else if (state.lifes === 1) draw_leg1()
    } else if (state.lifesInit === 7) {
        if (state.lifes === 6) { draw_gallow0(); draw_gallow1(); draw_gallow2() }
        else if (state.lifes === 5) draw_head()
        else if (state.lifes === 4) draw_body()
        else if (state.lifes === 3) draw_hand1()
        else if (state.lifes === 2) draw_hand2()
        else if (state.lifes === 1) draw_leg1()
    } else if (state.lifesInit === 6) {
        if (state.lifes === 5) { draw_gallow0(); draw_gallow1(); draw_gallow2() }
        else if (state.lifes === 4) { draw_body(); draw_head() }
        else if (state.lifes === 3) draw_hand1()
        else if (state.lifes === 2) draw_hand2()
        else if (state.lifes === 1) draw_leg1()
    }
}

export function drawFinalPart() { draw_leg2() }

export function draw_gallow0() {
    const ctx = document.getElementById('hangman').getContext('2d')
    ctx.beginPath()
    ctx.moveTo(355, 7)
    ctx.lineTo(355, 480)
    ctx.lineWidth = 7
    ctx.stroke()
}

export function draw_gallow1() {
    const ctx = document.getElementById('hangman').getContext('2d')
    ctx.beginPath()
    ctx.moveTo(270, 480)
    ctx.lineTo(440, 480)
    ctx.lineWidth = 7
    ctx.stroke()
}

export function draw_gallow2() {
    const ctx = document.getElementById('hangman').getContext('2d')
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

export function draw_head() {
    const ctx = document.getElementById('hangman').getContext('2d')
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

export function draw_body() {
    const ctx = document.getElementById('hangman').getContext('2d')
    ctx.beginPath()
    ctx.moveTo(60, 122)
    ctx.lineTo(60, 250)
    ctx.lineWidth = 7
    ctx.stroke()
}

export function draw_hand1() {
    const ctx = document.getElementById('hangman').getContext('2d')
    ctx.beginPath()
    ctx.moveTo(60, 122)
    ctx.lineTo(30, 176)
    ctx.lineWidth = 6
    ctx.stroke()
}

export function draw_hand2() {
    const ctx = document.getElementById('hangman').getContext('2d')
    ctx.beginPath()
    ctx.moveTo(60, 122)
    ctx.lineTo(90, 176)
    ctx.lineWidth = 6
    ctx.stroke()
}

export function draw_leg1() {
    const ctx = document.getElementById('hangman').getContext('2d')
    ctx.beginPath()
    ctx.moveTo(60, 250)
    ctx.lineTo(30, 305)
    ctx.lineWidth = 7
    ctx.stroke()
}

export function draw_leg2() {
    const ctx = document.getElementById('hangman').getContext('2d')
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