// Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента, и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

function recursiveTraversal(element) {
  // Выводим информацию о текущем теге
  console.log(element.tagName);

  // Рекурсивно обходим дочерние узлы

  for (let i = 0; i < element.children.length; i++) {
    recursiveTraversal(element.children[i]);
  }
}

// Начинаем обход например c body
const startingElement = document.body;
