// Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

function createAndStyleElement(color) {
  // Создаем новый элемент и назначаем класс

  const newElement = document.createElement("div");
  newElement.className = "newElementStyle";

  // Устанавливаем стиль с помощью свойства style
  newElement.style.backgroundColor = color;

  // Добавляем элемент внутрь элемента с id="25"
  const containerElement = document.getElementById("25");
  containerElement.appendChild(newElement);
}
