// Обработчик события storage не будет работать, поэтому можно переписать исходные функции

// Сохраняем оригинальные методы localStorage
const originalSetItem = localStorage.setItem;
const originalRemoveItem = localStorage.removeItem;

// Переопределяем методы localStorage
localStorage.setItem = function (key, value) {
  originalSetItem.apply(this, arguments);
  calculateStorageUsage();
};

localStorage.removeItem = function (key) {
  originalRemoveItem.apply(this, arguments);
  calculateStorageUsage();
};

// Основная функция
function calculateStorageUsage() {
  // Размер хранилища берем из size, если его нет определяем через getMaxLocalStorageSize
  let maxStorageSize = Number(localStorage.getItem("size"));
  if (!maxStorageSize) {
    maxStorageSize = getMaxLocalStorageSize();
  }
  // Выводим значения
  updateUsage(maxStorageSize);
}

// Функция обновления занимаемого объема памяти
function updateUsage(maxStorageSize) {
  const usedStorage = JSON.stringify(localStorage).length / (1024 * 512); // Превращаем в строку, переводим в мегабайты
  const usagePercentage = (usedStorage / maxStorageSize) * 100;
  console.log(`Занято: ${usedStorage.toFixed(5)} MB`);
  console.log(`Из: ${maxStorageSize} MB`);
  console.log(`В процентах: ${usagePercentage.toFixed(2)}%`);
}
