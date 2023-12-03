// Реализовать функцию конвертации JSON в строку

function customStringify(obj) {
  if (typeof obj !== "object" || obj === null) {
    // Если переданный объект не является объектом, возвращаем его строковое представление
    return String(obj);
  }

  // Создаем массив для хранения пар "ключ-значение"
  const keyValuePairs = [];

  // Проходим по всем ключам объекта
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // Рекурсивно вызываем customStringify для каждого значения
      const value = customStringify(obj[key]);
      // Добавляем в массив пару "ключ-значение" в виде строки
      keyValuePairs.push(`"${key}":${value}`);
    }
  }

  // Оборачиваем массив в строку
  return `{${keyValuePairs.join(",")}}`;
}
