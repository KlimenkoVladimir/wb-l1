function outerFunction(outerVariable) {
  // Внутренняя функция, которая имеет доступ к outerVariable
  function innerFunction() {
    console.log(outerVariable);
  }

  // Возвращаем внутреннюю функцию
  return innerFunction;
}
