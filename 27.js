const animatedButton = document.getElementById("animatedButton");
// При нажатии на кнопку вызываем функцию
animatedButton.addEventListener("click", function () {
  const hasAnimationClass = animatedButton.classList.contains("animate"); // Проверяем, нажата кнопка или нет

  // Если нажата, убираем класс, иначе добавляем
  if (hasAnimationClass) {
    animatedButton.classList.remove("animate");
  } else {
    animatedButton.classList.add("animate");
  }
});
