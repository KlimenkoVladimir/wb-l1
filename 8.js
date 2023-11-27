// function executeFunctions(arr) {
//   // Вызываем каждую функцию по очереди
//   return function (...args) {
//     const results = arr.map((func) => func(...args));
//     return results;
//   };
// }

// const getResult = executeFunctions(arr);

function executeFunctions(arr) {
  // Возвращаем функцию, которая вызывает каждую функцию по очереди и возвращает массив результатов
  return function (...args) {
    const results = arr.map((func) => func(...args));
    return results;
  };
}

// Пример использования
const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;
const subtract = (x) => (y) => x - y;

const functionsArray = [add(1), multiply(2), subtract(3)];

// Создаем объект getResult, который содержит функцию для вызова функций из массива
const getResult = executeFunctions(functionsArray);

// Вызываем объединенную функцию с аргументом 5
// const results = getResult(5);
