// Имитация задержки асинхронной операции
function someAsyncOperation(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Function ${number}`);
      resolve();
    }, 1000);
  });
}

async function asyncExample() {
  try {
    // Выполнение асинхронных операций
    const result1 = await someAsyncOperation(1);
    const result2 = await someAsyncOperation(2);
    const result3 = await someAsyncOperation(3);

    // Возвращаем результаты выполнения
    return result1, result2, result3;
  } catch (error) {
    // Обработка ошибок
    console.error("Ошибка:", error);
    throw error;
  }
}
