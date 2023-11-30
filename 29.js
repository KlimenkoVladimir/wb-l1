function submitForm(event) {
  event.preventDefault();
  // Получаем данные из формы
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Выполняем действия с данными (в данном случае, просто отображаем их)
  displayResult(
    `Здравствуйте ${name}! Для подтверждения вам было отправлено письмо на почту ${email}`
  );
}

function displayResult(result) {
  // Отображаем результат
  const resultContainer = document.getElementById("result");
  resultContainer.textContent = result;
}
