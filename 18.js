function getMaxLocalStorageSize() {
  console.log("getMax");
  localStorage.clear(); // Очищаем хранилище перед замером
  let i = 0;
  try {
    // Пока не выдает ошибку заполняем хранилище
    while (true) {
      i++;
      localStorage.setItem(
        "test",
        new Array(i * 1024 * (1024 / 2)).join("a") // Помещаем в test строку весом 1 Мб, т.к. один символ весит 2 байта => 1024 * 1024/2 = 1Мб
      );
    }
  } catch (e) {
    // Если ошибка значит хранилище переполнено
    localStorage.removeItem("test"); // Очищаем
    localStorage.setItem("size", i); // Устанавливаем размер
  }
  return Number(localStorage.getItem("size")) * 1024; // Для удобства возвращаем значение в Кб
}

export default getMaxLocalStorageSize;
