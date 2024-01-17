// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи

// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N
// 	Будет плюсом, если задумаетесь и об оптимизации.

const MathX = (function () {
  // Возвращаемый объект с методами
  return {
    // Вычисление N-го числа в ряду Фибоначчи
    fibonacci: function (n) {
      // Первые два числа 0 и 1
      if (n === 1) return 0;
      if (n === 2) return 1;
      let a = 0;
      let b = 1;
      for (let i = 3; i <= n; i++) {
        // Следующее число равно сумме предыдущих
        let nextNum = a + b;
        // Переопределяем числа
        a = b;
        b = nextNum;
      }
      return b;
    },

    // Вычисление всех чисел в ряду Фибоначчи до числа N
    fibonacciSequence: function (n) {
      // Первые два числа 0 и 1
      const arr = [];
      let count = 1;
      while (true) {
        const nextFibonacci = this.fibonacci(count);
        if (nextFibonacci <= n) {
          // Добавляем следующее число Фибоначчи
          arr.push(nextFibonacci);
          count++;
        } else {
          break; // Прерываем цикл, если следующее число превысило n
        }
      }
      return arr;
    },

    // Функция для проверки простоты числа
    isPrime: function (num) {
      if (num < 2) return false;
      for (let i = 2; i < num; i++) {
        // Если num делится без остатка, то оно не является простым
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    },

    // Вычисление N-го простого числа
    nthPrime: function (n) {
      // Первое число 2
      if (n === 1) return 2;
      let count = 1;
      let num = 2;
      while (count < n) {
        num++;
        // Если число простое, увеличиваем счетчик
        if (this.isPrime(num)) {
          count++;
        }
      }

      return num;
    },

    // Вычисление всех простых чисел до числа N
    primesSequence: function (n) {
      // Первое число 2
      const primes = [2];
      for (let i = 3; i <= n; i += 2) {
        // Если число простое, добавляем в последовательность
        if (this.isPrime(i)) {
          primes.push(i);
        }
      }
      return primes;
    },
  };
})();
