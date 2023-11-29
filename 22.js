// Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.

// Установлена максимальная вложенность 21
// Ограничение введено как мера предосторожности, чтобы избежать бесконечных или чрезмерно глубоких циклов

let count = 0;

function tryDocumentWrite() {
  try {
    count++;
    document.write("<script>tryDocumentWrite();</script>"); // Делаем рекурсивный вызов
  } catch (e) {
    console.log(e); // Отслеживаем ошибку
  }

  return count - 1;
}
