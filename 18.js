function getMaxLocalStorageSize() {
  console.log("getMax");
  localStorage.clear(); // Очищаем хранилище перед замером
  let i = 0;
  try {
    // Пока не выдает ошибку заполняем хранилище
    while (true) {
      i++;
      originalSetItem.call(
        // Используем оригинальные методы localStorage
        localStorage,
        "test",
        new Array(i * 1024 * 512).join("a") // Помещаем в test строку весом 1 Мб, т.к. один символ весит 2 байта => 1024 * 512 *2 = 1Мб
      );
    }
  } catch (e) {
    // Если ошибка значит хранилище переполнено
    originalRemoveItem.call(localStorage, "test"); // Очищаем
    originalSetItem.call(localStorage, "size", i); // Устанавливаем размер
  }
  return Number(localStorage.getItem("size"));
}
