// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле
// с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
// Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий

// API ключ
const API_KEY = "f7864570-5dbb-49b9-a03f-2d63730fa0aa";

// Функция для выполнения геокодирования через Yandex API
function geocodeYandex(address, callback) {
  // Формирование URL для запроса геокодирования
  const url = `https://geocode-maps.yandex.ru/1.x/?lang=ru_RU&apikey=${API_KEY}&geocode=${encodeURIComponent(
    address
  )}&format=json`;

  // Выполнение запроса с использованием fetch
  fetch(url)
    .then((response) => {
      // Проверка на успешность HTTP-ответа
      if (!response.ok) {
        throw new Error("Ошибка");
      }
      return response.json();
    })
    .then((data) => handleGeocodeResponse(data, callback)) // Обработка успешного ответа
    .catch((error) => console.error("Ошибка:", error)); // Обработка ошибок
}

// Обработка успешного ответа от Yandex Geocoding API
function handleGeocodeResponse(data, callback) {
  // Извлечение результатов из ответа API
  const results = data.response.GeoObjectCollection.featureMember.map(
    (item) => ({
      address: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
      coordinates: item.GeoObject.Point.pos.split(" ").reverse(),
    })
  );
  // Вызов переданной callback-функции с результатами геокодирования
  callback(results);
}

// Функция debounce: возвращает функцию, вызывающую переданную функцию не чаще, чем раз в указанный интервал времени
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    // Очистка предыдущего таймера
    clearTimeout(timeoutId);
    // Установка нового таймера с задержкой
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Обработчик события выполняется после полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Получение элементов
  const addressInput = document.getElementById("address-input");
  const resultsList = document.getElementById("results-list");

  // Функция-обработчик для debounce геокодирования при вводе адреса
  const geocode = debounce(function () {
    // Получение введенного значения адреса
    const inputValue = addressInput.value.trim();
    // Проверка наличия введенного значения
    if (inputValue.length === 0) {
      resultsList.innerHTML = "";
      return;
    }

    // Выполнение геокодирования при вводе адреса и обновление списка результатов
    geocodeYandex(inputValue, (results) => {
      renderResults(results);
    });
  }, 300);

  // Назначение обработчика на событие ввода
  addressInput.addEventListener("input", geocode);
});

// Функция для отображения результатов геокодирования в выпадающем списке
function renderResults(results) {
  // Получение ссылки на HTML-элемент для списка результатов
  const resultsList = document.getElementById("results-list");
  // Очистка списка
  resultsList.innerHTML = "";

  // Проверка наличия результатов геокодирования
  if (results.length === 0) {
    // Если результатов нет, добавляем элемент с информацией
    const noResultsItem = document.createElement("li");
    noResultsItem.textContent = "Не найдено";
    resultsList.appendChild(noResultsItem);
  } else {
    // Если есть результаты, добавляем элементы в список
    results.forEach((result) => {
      const resultItem = document.createElement("li");
      resultItem.textContent = result.address;
      resultsList.appendChild(resultItem);
    });
  }
}
