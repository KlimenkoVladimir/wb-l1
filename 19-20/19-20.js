// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты.
// Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу,
// а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

// Обход CORS происходит через расширение Allow CORS

// Импортируем функцию нахождения максимального объема local storage
import getMaxLocalStorageSize from "../18.js";

// Получаем элементы
const widget = document.querySelector(".widget");
const content = document.querySelector(".content");
const loading = document.querySelector(".loading");

// Объявим переменные
const TOKEN =
  "vk1.a.Njch1xclFmuwhKw8YWpFybJ4XiiziFYcEIWK9-VZDzItLsFCFKj09iK70iApNEoVJE3I03hYMXULxv9pLmkqIjBNbJRoT5Iq0VjrUsOybYLOo-uRaozHdBfGv2Vi_4D-t3pcpPorDa6FtdebInhfJUevBFG1FUjeotmJe6jr7xMBjW_PNoSeQQUR07tD7cu77SwGKOdl53t3YRHuapquaw";
const DOMAIN = "momdontread";
const GROUP_ID = 112709585;
let OFFSET = JSON.parse(localStorage.getItem("offset")) || 1;
const COUNT = 5;
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let postsToRender = [];
let group = JSON.parse(localStorage.getItem("group")) || {};
let maxSize = Number(localStorage.getItem("maxSize"));

const start = async () => {
  calculateMaxSize();
  await getGroup();
  posts.length === 0 ? await getPosts() : (postsToRender = posts);
  renderPosts();
  loading.style.display = "none";
};
start();

const addPostsToLocalStorage = () => {
  let currentSize = JSON.stringify(localStorage).length / 512; // Получаем текущий размер хранилища в Кб
  let newDataSize = JSON.stringify(postsToRender).length / 512; // Получаем размер новых постов в Кб
  console.log(posts);
  // При переполнении хранилища удаляем половину постов, загруженных ранее
  if (currentSize + newDataSize >= maxSize) {
    posts = posts.slice(COUNT * 2);
  }

  localStorage.setItem("posts", JSON.stringify(posts)); //Передаем посты в хранилище
  currentSize = JSON.stringify(localStorage).length / 512; // Обновляем текущий размер хранилища
  console.log("Объем данных в Local Storage: ", currentSize, "/", maxSize);
};

// Функция для получения группы:
async function getGroup() {
  const url =
    `https://api.vk.com/method/groups.getById?` +
    `access_token=${TOKEN}&` +
    `group_id=${GROUP_ID}&` +
    `v=5.199`;

  // Делаем проверку, чтобы не делать повторный запрос группы
  if (Object.keys(group).length !== 0) {
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    group = data.response.groups[0];
    localStorage.setItem("group", JSON.stringify(group));
  } catch (error) {
    (error) => console.log("Ошибка", error);
  }
}

// Функция для получения постов:
async function getPosts() {
  const url =
    `https://api.vk.com/method/wall.get?` +
    `access_token=${TOKEN}&` +
    `domain=${DOMAIN}&` +
    `offset=${OFFSET}&` +
    `count=${COUNT}&` +
    `v=5.199`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    postsToRender = data.response.items;
    posts.push(...postsToRender); // Добавляем посты
    OFFSET += COUNT; // Увеличиваем офсет
    localStorage.setItem("offset", JSON.stringify(OFFSET));
    addPostsToLocalStorage();
  } catch (error) {
    (error) => console.log("Ошибка", error);
  }
}

// Делаем debounce, чтобы предотвратить повторные запросы к api при скроле
const debounce = (func) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), 300);
  };
};

// При скроле делаем подгрузку постов
widget.addEventListener(
  "scroll",
  debounce(async () => {
    // Рассчитываем расстояние до нижней границы виджета
    let scrollBottom =
      widget.scrollHeight - widget.scrollTop - widget.clientHeight;
    // Когда доходим до низа, делаем подгрузку
    if (scrollBottom < 5) {
      await getGroup();
      await getPosts();
      renderPosts();
    }
  })
);

// Функция рендера постов
const renderPosts = async () => {
  postsToRender.forEach((item) => {
    const post = document.createElement("div"); // Пост
    post.classList.add("post");
    const header = document.createElement("div"); // Шапка поста
    header.classList.add("header");
    const imgGroup = document.createElement("div");
    imgGroup.classList.add("img-group");
    const title = document.createElement("div"); // Название и дата
    title.classList.add("title");
    const groupTitle = document.createElement("p"); // Название
    groupTitle.classList.add("group-title");
    const data = document.createElement("p"); // Дата
    data.classList.add("data");
    const imagesWidget = document.createElement("div"); // контейнер для картинки группы
    imagesWidget.classList.add("img-widget");
    const image = document.createElement("img"); // сама картинка
    const text = document.createElement("p");
    text.classList.add("post-text");

    groupTitle.innerHTML = group.name;
    title.appendChild(groupTitle);
    image.src = group.photo_50;
    header.appendChild(title);
    imagesWidget.appendChild(image);
    header.appendChild(imagesWidget);
    post.appendChild(header);

    // Данные времени приходят в формате unix timestamp, переводим данные  с помощью объекта Date. Метод toLocaleDateString() принимает время в мс, поэтому умножаем на 1000
    let postDate = new Date(item.date * 1000).toLocaleDateString("ru", {
      day: "numeric",
      month: "long",
    });
    let postTime = new Date(item.date * 1000).toLocaleTimeString("ru", {
      hour: "numeric",
      minute: "numeric",
    });

    data.innerHTML = `${postDate} в ${postTime}`;
    header.appendChild(title);
    title.appendChild(data);
    text.innerHTML = item.text;
    post.append(text);

    // Для каждого прикрепленного изображения берем фото нужного размера
    item.attachments.forEach((attachment) => {
      if (attachment.type === "photo") {
        const img = document.createElement("img");
        img.src = attachment?.photo?.sizes[2].url;
        imgGroup.appendChild(img);
        post.appendChild(imgGroup);
      }
    });
    content.append(post);
  });
};

// Считаем максимальный размер хранилища 1 раз, т.к. он не будет изменяться
function calculateMaxSize() {
  if (maxSize === 0) {
    // Считаем максимальный размер хранилища с помощью функции из задачи 18
    maxSize = getMaxLocalStorageSize();
    // Сохраняем в хранилище
    localStorage.setItem("maxSize", JSON.stringify(maxSize));
  }
}
