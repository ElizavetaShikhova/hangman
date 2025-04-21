import express from 'express';
import path from 'path';
import { readFileSync } from 'fs';

const __dirname = path.resolve();
const app  = express();
const PORT = process.env.PORT || 3000;

const words = JSON.parse(
    readFileSync(path.join(__dirname, 'words.json'), 'utf8')
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/word', (_req, res) => {
    const random = words[Math.floor(Math.random() * words.length)];
    res.json({ word: random });
});

app.listen(PORT, () =>
    console.log(`Hangman server is running → http://localhost:${PORT}`)
);
