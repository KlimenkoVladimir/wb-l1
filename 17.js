// Получаем элементы формы и инпута
const geocodingForm = document.getElementById("geocodingForm");
const addressInput = document.getElementById("addressInput");
const addressDropdown = document.getElementById("addressDropdown");

// Обработчик события при отправке формы
geocodingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Получаем введенный адрес
  const address = addressInput.value;

  // Выполняем геокодирование
  geocodeAddress(address);
});

// Функция геокодирования
function geocodeAddress(address) {
  ymaps
    .geocode(address)
    .then((result) => {
      // Очищаем предыдущие результаты
      addressDropdown.innerHTML = "";

      // Перебираем найденные объекты
      result.geoObjects.each((geoObject) => {
        // Создаем опцию для выпадающего списка
        const option = document.createElement("option");
        option.value = geoObject.getAddressLine();
        addressDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Ошибка геокодирования:", error.message);
    });
}
