// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. Напишите код, который сортирует этот массив по возрастанию возраста, а при равных возрастах сортирует по алфавиту по полю name.

// Например
// [
//   { name: 'John', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Bob', age: 25 },
//   { name: 'Eve', age: 22 },
// ]

function sortPeople(people) {
  // Функция сравнения для сортировки
  function comparePeople(a, b) {
    // Сначала сортируем по возрасту
    if (a.age !== b.age) {
      return a.age - b.age;
    }

    // При равных возрастах сортируем по имени
    return a.name.localeCompare(b.name);
  }

  // Сортировка массива объектов
  const sortedPeople = people.sort(comparePeople);

  // Вывод отсортированного массива
  console.log(sortedPeople);
}
