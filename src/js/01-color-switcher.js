// В HTML есть кнопки «Start» и «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    const containerEl = document.querySelector('body');
    const startBtn = document.querySelector('[data-start]');
    const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
    
startBtn.addEventListener("click", () => {
    
    timerId = setInterval(() => {
    containerEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});