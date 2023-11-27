// Базовый класс Shape
class Shape {
  // Метод для расчета площади (в базовом классе возвращает null)
  calculateArea() {
    return null;
  }

  // Метод для расчета периметра (в базовом классе возвращает null)
  calculatePerimeter() {
    return null;
  }

  // Метод для вывода информации о фигуре
  getInfo() {
    return `Color: ${this.color}`;
  }
}

// Подкласс Rectangle (прямоугольник), расширяющий базовый класс Shape
class Rectangle extends Shape {
  // Конструктор принимает цвет, ширину и высоту прямоугольника
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  // Реализация метода для расчета площади прямоугольника
  calculateArea() {
    return this.width * this.height;
  }

  // Реализация метода для расчета периметра прямоугольника
  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }

  // Переопределение метода getInfo для вывода информации о прямоугольнике
  getInfo() {
    return `Rectangle - ${super.getInfo()}, Width: ${this.width}, Height: ${
      this.height
    }`;
  }
}

// Подкласс Circle (круг), расширяющий базовый класс Shape
class Circle extends Shape {
  // Конструктор принимает цвет и радиус круга
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  // Реализация метода для расчета площади круга
  calculateArea() {
    return Math.PI * this.radius ** 2;
  }

  // Реализация метода для расчета периметра круга
  calculatePerimeter() {
    return 2 * Math.PI * this.radius;
  }

  // Переопределение метода getInfo для вывода информации о круге
  getInfo() {
    return `Circle - ${super.getInfo()}, Radius: ${this.radius}`;
  }
}

// Подкласс Triangle (треугольник), расширяющий базовый класс Shape
class Triangle extends Shape {
  // Конструктор принимает цвет и длины трех сторон треугольника
  constructor(color, side1, side2, side3) {
    super(color);
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  // Реализация метода для расчета площади треугольника
  calculateArea() {
    const s = (this.side1 + this.side2 + this.side3) / 2;
    return Math.sqrt(
      s * (s - this.side1) * (s - this.side2) * (s - this.side3)
    );
  }

  // Реализация метода для расчета периметра треугольника
  calculatePerimeter() {
    return this.side1 + this.side2 + this.side3;
  }

  // Переопределение метода getInfo для вывода информации о треугольнике
  getInfo() {
    return `Triangle - ${super.getInfo()}, Side1: ${this.side1}, Side2: ${
      this.side2
    }, Side3: ${this.side3}`;
  }
}

// Пример использования классов
const rectangle = new Rectangle("Blue", 5, 10);
console.log(rectangle.getInfo());
console.log("Area:", rectangle.calculateArea());
console.log("Perimeter:", rectangle.calculatePerimeter());

const circle = new Circle("Red", 7);
console.log(circle.getInfo());
console.log("Area:", circle.calculateArea());
console.log("Perimeter:", circle.calculatePerimeter());

const triangle = new Triangle("Green", 3, 4, 5);
console.log(triangle.getInfo());
console.log("Area:", triangle.calculateArea());
console.log("Perimeter:", triangle.calculatePerimeter());
