// Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON, содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

// Определение класса для узла списка
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Функция для преобразования JSON в связанный список
function jsonToLinkedList(json) {
  // Проверка наличия JSON и его корректности
  if (!json || !Array.isArray(json)) {
    throw new Error("Invalid JSON format.");
  }

  // Создаем голову списка
  let head = new ListNode(json[0]);

  // Используем указатель для перемещения по списку
  let current = head;

  // Перемещаемся по JSON и создаем узлы списка
  for (let i = 1; i < json.length; i++) {
    current.next = new ListNode(json[i]);
    current = current.next;
  }

  return head;
}
