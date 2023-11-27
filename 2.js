function isStrangeNumber(num) {
  num = Number(num);
  if (num <= 0) {
    console.log(false); // Отрицательные числа и ноль не могут быть странными
  }

  let sumOfDivisors = 0;

  // Находим делители числа и суммируем их
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sumOfDivisors += i;
    }
  }

  // Проверяем, является ли число странным
  console.log(num === sumOfDivisors);
}
