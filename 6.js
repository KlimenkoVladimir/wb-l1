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
