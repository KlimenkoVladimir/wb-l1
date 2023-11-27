// Базовый класс Shape
class Shape {
  // Конструктор принимает цвет фигуры
  constructor(color) {
    this.color = color;
  }

  // Метод для вывода информации о фигуре
  getInfo() {
    return `Цвет: ${this.color}`;
  }
}

// Подкласс Rectangle
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
    return `Прямоугольник - ${super.getInfo()}, Ширина: ${
      this.width
    }, Высота: ${this.height}`;
  }
}

// Подкласс Circle
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
    return `Круг - ${super.getInfo()}, Радиус: ${this.radius}`;
  }
}

// Подкласс Triangle
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
    return `Треугольник - ${super.getInfo()}, Сторона 1: ${
      this.side1
    }, Сторона 2: ${this.side2}, Сторона 3: ${this.side3}`;
  }
}
