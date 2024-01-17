// Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию. Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции, даже после того, как внешняя функция завершила свое выполнение.

function outerFunction() {
  const outerVariable = "Это значение внешней функции";
  // Внутренняя функция, которая имеет доступ к outerVariable
  function innerFunction(innerVariable) {
    console.log(outerVariable, innerVariable);
  }

  // Возвращаем внутреннюю функцию
  return innerFunction;
}

const myClosure = outerFunction();
