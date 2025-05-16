export async function fetchWord() {
    const res = await fetch('/api/word')
    const { word } = await res.json()
    return word.toLowerCase()
}