function callFunctions(arr) {
  // Вызываем каждую функцию по очереди
  arr.forEach((func, index) => {
    func();
    console.log(index);
  });
}
