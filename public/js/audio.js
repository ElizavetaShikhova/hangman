export function music(s) {
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