// Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

// Получаем контейнер и шаблон
const container = document.getElementById("28");
const template = document.getElementById("template");

// Функция принимает текст заметки и создает ее в соответствии с шаблоном
function addNoteElement(text) {
  // Клонируем содержимое шаблона, создаем заметку
  const newNote = document.importNode(template.content, true);

  // Передаем текст в заметку
  const noteTextElement = newNote.querySelector(".template-text");
  noteTextElement.textContent = text;

  // Добавляем заметку в контейнер
  container.appendChild(newNote);
}
