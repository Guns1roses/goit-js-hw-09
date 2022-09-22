// Выполняй это задание в файлах 03-promises.html и 03-promises.js. Посмотри демо видео работы генератора промисов.

// В HTML есть разметка формы, в поля которой пользователь будет вводить первую задержку в миллисекундах,
//   шаг увеличения задержки для каждого промиса после первого и количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount. 
// При каждом вызове передай ей номер создаваемого промиса(position) и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени.
// Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров.
//  Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.



import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputFormData = document.querySelector('.form');

inputFormData.addEventListener('submit', startCreatePromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

function startCreatePromises(e) {
  e.preventDefault();

  let step = Number(e.currentTarget.step.value);
  let delay = Number(e.currentTarget.delay.value);
  let amount = Number(e.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(success => console.log('✅ Fulfilled promise'))
      .catch(error => console.log('❌ Rejected promise'));
    delay += step;
  }
}