function showPasswordStrength() {
  const passwordInput = document.getElementById("passwordInput");
  const resultLabel = document.getElementById("resultLabel");

  const result = analyzePassword(passwordInput.value); // Вызываем функцию для анализа пароля
  resultLabel.textContent = result; // Передаем сообщение в лэйбл
}

function analyzePassword(password) {
  // Минимальная длина пароля
  const minLength = 8;

  // Проверка длины пароля
  if (password.length < minLength) {
    return "Слишком короткий пароль. Используйте как минимум 8 символов.";
  }

  // Проверка наличия цифр
  if (!/\d/.test(password)) {
    return "Добавьте цифры для улучшения сложности пароля.";
  }

  // Проверка наличия заглавных букв
  if (!/[A-Z]/.test(password)) {
    return "Добавьте заглавные буквы для улучшения сложности пароля.";
  }

  // Проверка наличия строчных букв
  if (!/[a-z]/.test(password)) {
    return "Добавьте строчные буквы для улучшения сложности пароля.";
  }

  // Проверка наличия специальных символов
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return "Добавьте специальные символы для улучшения сложности пароля.";
  }

  // Если все условия выполнены, пароль считается сложным
  return "Отличный пароль!";
}
