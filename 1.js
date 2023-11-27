function isPalindrome(str) {
  // Убираем пробелы и приводим все символы к нижнему регистру
  const cleanedStr = str.replace(/\s/g, "").toLowerCase();

  // Сравниваем строку с её зеркальным отражением
  console.log(cleanedStr === cleanedStr.split("").reverse().join(""));
}
