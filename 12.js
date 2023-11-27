const book = {
  title: "1984",
  author: "G. Orwell",
  year: 1949,

  // Метод для получения названия книги
  getTitle: function () {
    return this.title;
  },

  // Метод для изменения названия книги
  setTitle: function (newTitle) {
    this.title = newTitle;
    return this;
  },

  // Метод для получения автора книги
  getAuthor: function () {
    return this.author;
  },

  // Метод для изменения автора книги
  setAuthor: function (newAuthor) {
    this.author = newAuthor;
    return this;
  },

  // Метод для получения года издания книги
  getYear: function () {
    return this.year;
  },

  // Метод для изменения года издания книги
  setYear: function (newYear) {
    this.year = newYear;
    return this;
  },
};
