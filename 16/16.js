// Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами. Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

// Импортируем функции из модуля
import { getCurrentDate, addDays } from "./dateModule.js";

// Вызываем функции
const currentDate = getCurrentDate();
console.log("Дата:", currentDate);

const addDate = addDays(2);
console.log("Прибавленная дата:", addDate);
