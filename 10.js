// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

// Пример '{"name": "John", "age": 25, "address":{"city": "New York", "country": null}, "isActive": true}'

function customJsonParse(jsonString) {
  let index = 0;

  function parseValue() {
    const currentChar = jsonString[index];
    // По первому символу определяем что парсим
    if (currentChar === "{") {
      return parseObject();
    } else if (currentChar === "[") {
      return parseArray();
    } else if (currentChar === '"') {
      return parseString();
    } else if (currentChar === "t" || currentChar === "f") {
      return parseBoolean();
    } else if (currentChar === "n") {
      return parseNull();
    } else if (
      currentChar === "-" ||
      (currentChar >= "0" && currentChar <= "9")
    ) {
      return parseNumber();
    }

    throw new Error(`Unexpected character: ${currentChar}`);
  }
  // Парсим объект
  function parseObject() {
    const obj = {};
    index++; // Пропускаем '{'

    while (jsonString[index] !== "}") {
      // Парсим ключ как строку
      const key = parseString();
      index++; // Пропускаем ':'

      // Пропускаем пробелы после двоеточия
      while (jsonString[index] === " ") {
        index++;
      }
      // Парсим значение, оно может быть любого типа
      const value = parseValue();
      obj[key] = value;

      if (jsonString[index] === ",") {
        index++; // Пропускаем ','
      }

      // Пропускаем пробелы после запятой
      while (jsonString[index] === " ") {
        index++;
      }
    }

    index++; // Пропускаем '}'
    return obj;
  }

  // Парсим массив
  function parseArray() {
    const arr = [];
    index++; // Пропускаем '['

    while (jsonString[index] !== "]") {
      // Парсим значение, оно может быть любого типа
      const value = parseValue();
      // Добавляем в arr
      arr.push(value);

      if (jsonString[index] === ",") {
        index++; // Пропускаем ','
      }

      // Пропускаем пробелы после запятой
      while (jsonString[index] === " ") {
        index++;
      }
    }

    index++; // Пропускаем ']'
    return arr;
  }

  // Парсим строку
  function parseString() {
    let result = "";
    index++; // Пропускаем открывающуюся '"'

    while (jsonString[index] !== '"') {
      result += jsonString[index];
      index++;
    }

    index++; // Пропускаем закрывающуюся '"'
    return result;
  }

  // Парсим булевы значения
  function parseBoolean() {
    const boolStr = jsonString.substr(index, 4);
    // Проверяем, true или false
    if (boolStr === "true") {
      index += 4;
      return true;
    } else if (boolStr === "false") {
      index += 5;
      return false;
    }
  }

  // Парсим null
  function parseNull() {
    const nullStr = jsonString.substr(index, 4);
    // Проверяем что null
    if (nullStr === "null") {
      index += 4;
      return null;
    }
  }

  // Парсим числа
  function parseNumber() {
    let numStr = "";
    // Цикл проходит по символам, пока не закончится число
    while (
      (jsonString[index] >= "0" && jsonString[index] <= "9") ||
      jsonString[index] === "."
    ) {
      // Добавляем символ и переходим к следующему
      numStr += jsonString[index];
      index++;
    }
    // Преобразуем строку в число
    const num = parseFloat(numStr);

    return num;
  }

  return parseValue();
}
