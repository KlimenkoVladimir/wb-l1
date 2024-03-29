// В колстеке память занимает сам вызов функции и переменные которые есть в каждом вызове функции. Необходимо определить сколько занимает вызов функции.

function calculateStackSize() {
  // Определяем сколько раз можно вызвать функцию без переменных внутри
  let i = 0;
  const func = () => {
    i++;
    func();
  };

  // Ловим ошибку переполнения и выводим значение счетчика в консоль
  try {
    func();
  } catch (e) {
    console.log(i); // 12542
  }

  // Определяем сколько раз можно вызвать функцию с одной переменной внутри
  let j = 0;
  const func2 = () => {
    let a = j + 1;
    j++;
    func2();
  };
  try {
    func2();
  } catch (e) {
    console.log(j); // 11402
  }

  // Размер колстека определяется как:
  // X = (K * S + N) * C
  // где K - количество локальных переменных,
  // S - размер одной переменной. Так как наши переменные - это целые числа, то S = 8 байт
  // так как переменные у нас - это однозначные числа, то размер у них одинаковый и в формуле мы умножаем K на S
  // N - размер оставшейся части функции, который одинаков у func1 и func2. Как мы заметили выше, различаются они только количеством переменных
  // C - количество вызовов для конкретной функции

  // Отсюда
  // X = (0 * 8 + N) * 12542
  // X = (1 * 8 + N) * 11402
  let n = (1 * 8 * j) / (i - j);
  // N =  ~ 80 байт
  // Подставляем в формулу и получаем значение в Кб:
  let x = ((0 * 8 + n) * i) / 1024;

  console.log("Размер коллстэка: ", x.toFixed(3), "Кб");
}

// Chrome ~ 979 Кб
// Opera  ~981 Кбайт
// Яндекс Браузер ~980 Кбайт
