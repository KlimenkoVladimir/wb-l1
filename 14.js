// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении, когда оно загружено. Когда говорится "промис разрешается с данными об изображении", это означает, что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

async function loadImage(url) {
  try {
    const imageData = await new Promise((resolve, reject) => {
      const image = new Image();
      // Устанавливаем URL изображения для загрузки
      image.src = url;

      // Устанавливаем обработчики событий для успешной загрузки изображения и ошибки
      image.onload = () => {
        // Разрешаем промис с данными об изображении
        resolve({
          width: image.width,
          height: image.height,
          src: image.src,
        });
      };

      image.onerror = () => {
        // Отклоняем промис с ошибкой, если изображение не загрузилось
        reject(new Error(`Failed to load image from ${url}`));
      };
    });
    console.log("Загружено:", imageData);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}
