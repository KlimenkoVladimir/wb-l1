import moment from "moment";

// Экспортируем функцию для форматирования текущей даты
export function getCurrentDate() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}

// Экспортируем функцию для добавления дней к текущей дате
export function addDays(days) {
  return moment().add(days, "days").format("YYYY-MM-DD HH:mm:ss");
}
