import { updateWord, updateLives } from './ui.js'
import { drawNextPart, drawFinalPart } from './draw.js'
import { checkGameState } from './ui.js'
import { music } from './audio.js'
import { state } from './store.js'

export function handleLetter(letter) {
    if (state.secret.includes(letter)) {
        [...state.secret].forEach((c, i) => {
            if (c === letter) state.guess[i] = c
        })
    } else {
        state.lifes--
        updateLives(state.lifes)
        drawNextPart()
    }

    updateWord()
    checkGameState()
    music(1)
}