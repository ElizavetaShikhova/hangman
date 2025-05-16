import { state } from './store.js'
import { bindLetterButtons, resetButtons } from './ui.js'
import { fetchWord } from './helpers.js'
import { updateWord, updateLives, checkGameState, change, change2 } from './ui.js'
import { drawInitialGallow } from './draw.js'
import { handleLetter } from './gameLogic.js'

export async function initGame() {
    const canvas = document.getElementById('hangman')
    const ctx = canvas.getContext('2d')

    bindLetterButtons()
    document.getElementById('change').onclick = startGame
    document.getElementById('back').onclick = change2

    await startGame()
}

export async function startGame() {
    const select = document.getElementById('select')
    const selected = +select.value
    state.lifes = selected === -1 ? 8 : selected
    state.lifesInit = state.lifes

    resetButtons()

    state.secret = await fetchWord()
    state.guess = Array.from(state.secret, () => '_')
    state.guess[0] = state.secret[0]
    state.guess[state.secret.length - 1] = state.secret.at(-1)
    state.flag = true

    drawInitialGallow()
    updateWord()
    updateLives(state.lifes)
    change()
}