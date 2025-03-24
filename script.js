window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
  
    startBtn.addEventListener('click', () => {
      startScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
    });
  
    resetBtn.addEventListener('click', () => {
      gameScreen.classList.add('hidden');
      startScreen.classList.remove('hidden');
    });
  });
  