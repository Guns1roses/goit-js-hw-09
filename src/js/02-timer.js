// Выполняй это задание в файлах 02 - timer.html и 02 - timer.js.Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.
// Такой таймер может использоваться в блогах и интернет - магазинах, страницах регистрации событий, во время технического обслуживания и т.д.
// Посмотри демо видео работы таймера.

// Библиотека flatpickr
// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

// // Описан в документации
// import flatpickr from "flatpickr";
// // Дополнительный импорт стилей
// import "flatpickr/dist/flatpickr.min.css";

// Библиотека ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ поле input#datetime-picker.

// <input type="text" id="datetime-picker" />

// Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров. Мы подготовили для тебя объект который нужен для выполнения задания. Разберись за что отвечает каждое свойство в документации «Options» и используй его в своем коде.

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
// НЕ БУДЕМ УСЛОЖНЯТЬ
// Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты.Обрати внимание,
//     что она не форматирует результат.То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет 4,
//         а не 04.В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов.Напиши функцию addLeadingZero(value),
//     которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.






// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector("#datetime-picker");

const elDATA = {
    btnStart: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
}
const { btnStart, dataDays, dataHours, dataMinutes, dataSeconds } = elDATA;

let timerId = null;
changeDisableBtn(btnStart, true);

const optionsFlatpickr = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            return Notify.failure("Please choose a date in the future");
        }
        changeDisableBtn(btnStart, false);
    },
};

const flatPickrForm = flatpickr(inputEl, optionsFlatpickr);


function renderCounter() {
    const remainingTime = getRemainingTime(flatPickrForm.selectedDates[0].getTime())

    if (remainingTime < 1000) {
        clearInterval(timerId);
    }

    dataDays.textContent = addLeadingZero(convertMs(remainingTime).days);
    dataHours.textContent = addLeadingZero(convertMs(remainingTime).hours);
    dataMinutes.textContent = addLeadingZero(convertMs(remainingTime).minutes);
    dataSeconds.textContent = addLeadingZero(convertMs(remainingTime).seconds);
}

function getRemainingTime(selectedTime) {
    return selectedTime - Date.now();
}

function onTimerStart() {
    Notify.success("Let's begin!");
    changeDisableBtn(btnStart, true);
    timerId = setInterval(renderCounter, 1000);
}

btnStart.addEventListener('click', onTimerStart);



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function changeDisableBtn(btnElement, status) {
    btnElement.disabled = status;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}