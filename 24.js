// Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

document.addEventListener("DOMContentLoaded", function () {
  // Объявляем переменные
  const dataPerPage = 50;
  let currentPage = 1;
  let totalData;
  let data;
  let sortColumn;
  let sortDirection = "asc";

  loadData(); // Загружаем данные

  async function loadData() {
    try {
      // Делаем fetch зарос
      const response = await fetch(
        "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true"
      );
      // Отслеживаем на ошибки
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      // Передаем response в data и рендерим таблицу и пагинацию
      data = await response.json();
      totalData = data.length;
      renderTable();
      renderPagination();
    } catch (error) {
      // Отслеживаем на ошибки
      console.error(error);
    }
  }

  function renderTable() {
    const table = document.getElementById("data-table");
    table.innerHTML = "";

    // Считаем начало и конец страницы
    const startIndex = (currentPage - 1) * dataPerPage;
    const endIndex = Math.min(startIndex + dataPerPage, totalData);

    // Рендерим таблицу
    renderTableHeader(table);
    renderTableData(table, startIndex, endIndex);

    const thElements = document.getElementsByTagName("th");
    addSortEventListeners(thElements); // Сортируем
  }

  function renderTableHeader(table) {
    const headerRow = document.createElement("tr");
    // Для каждого столбца делаем заголовок из ключа
    for (const key in data[0]) {
      const th = document.createElement("th");
      th.innerText = key;
      th.dataset.key = key;
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
  }

  function renderTableData(table, startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      // Для каждого объекта в массиве делаем строку
      const row = document.createElement("tr");
      for (const key in data[i]) {
        // Для каждого значения объекта делаем столбец
        const td = document.createElement("td");
        td.innerText = data[i][key];
        row.appendChild(td);
      }
      table.appendChild(row);
    }
  }

  function addSortEventListeners(thElements) {
    for (let i = 0; i < thElements.length; i++) {
      // Для каждого элемента добавлляем слушатель на нажатие
      thElements[i].addEventListener("click", function () {
        const clickedColumn = this.dataset.key;
        // Сортируем  по возрастанию или по убыванию
        if (sortColumn === clickedColumn) {
          sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
          sortDirection = "asc";
        }

        sortColumn = clickedColumn;
        sortData();
        renderTable();
      });
    }
  }

  function sortData() {
    // Сортируем
    data.sort((a, b) => {
      const x = a[sortColumn];
      const y = b[sortColumn];

      if (typeof x === "string" && typeof y === "string") {
        return sortDirection === "asc"
          ? x.localeCompare(y)
          : y.localeCompare(x);
      } else {
        return sortDirection === "asc" ? x - y : y - x;
      }
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(totalData / dataPerPage);
    const paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    // Кнопка "назад"
    const prevBtn = document.createElement("span");
    prevBtn.innerText = "<";
    prevBtn.classList.add("page-btn");
    // При клике уменьшаем currentPage
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
    paginationElement.appendChild(prevBtn);

    // Создаем кнопки для каждой страницы
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("span");
      pageBtn.innerText = i;
      pageBtn.classList.add("page-btn");

      // // При клике переключаемся по страницам
      pageBtn.addEventListener("click", function () {
        currentPage = parseInt(this.innerText);
        renderTable();
      });

      paginationElement.appendChild(pageBtn);
    }

    // Кнопка "вперед"
    const nextBtn = document.createElement("span");
    nextBtn.innerText = ">";
    nextBtn.classList.add("page-btn");
    // При клике увеличиваем currentPage
    nextBtn.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    });
    paginationElement.appendChild(nextBtn);
  }
});
