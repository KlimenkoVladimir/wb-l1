const WordEndingModule = (function () {
  // Вспомогательная функция для определения окончания слова
  function getWordEnding(number, forms) {
    // Определяем последнюю и последние две цифры, если число больше 100
    const remainder10 = number % 10;
    const remainder100 = number % 100;

    if (remainder10 === 1 && remainder100 !== 11) {
      // Возвращаем первую форму если число заканчивается на 1 и последние 2 цифры у чисел больше 100 не 11
      return forms[0];
    } else if (
      [2, 3, 4].includes(remainder10) &&
      ![12, 13, 14].includes(remainder100)
    ) {
      // Возвращаем первую форму если число заканчивается на 2, 3, 4 и последние 2 цифры у чисел больше 100 не 12, 13, 14
      return forms[1];
    } else {
      // Возвращаем третью форму для всех остальных случаев
      return forms[2];
    }
  }

  // Основная функция, которую экспортируем из модуля
  function formatNumberWithEnding(number, words) {
    // Определяем окончание и добавляем его к числу
    const wordEnding = getWordEnding(number, words);
    return `${number} ${wordEnding}`;
  }

  // Экспортируем только необходимую функцию
  return {
    formatNumberWithEnding,
  };
})();
