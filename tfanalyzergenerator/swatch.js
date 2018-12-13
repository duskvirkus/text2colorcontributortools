"use strict";
class Swatch {

  constructor(parent, name, c, rgb) {
    c ? this.originalColor = this.originalColor = c : this.originalColor = null;
    this.outputColor = null;
    this.name = name;
    this.element = createDiv();
    this.element.addClass('m-3');
    this.element.addClass('rounded');
    this.element.addClass('border');
    this.element.addClass('border-dark');
    this.element.style('width', '50px');
    this.element.style('height', '50px');
    this.element.attribute('data-toggle', 'tooltip');
    this.element.attribute('data-html', 'true');
    this.subElements = [];
    this.subElements[0] = createDiv();
    this.subElements[0].style('background-color', color(127));
    if (this.originalColor != null) {
      this.element.style('height', '100px');
      this.subElements[1] = createDiv();
      this.subElements[1].style('background-color', this.originalColor);
      this.subElements[1].addClass('rounded-top');
      this.subElements[0].addClass('rounded-bottom');
    } else {
      this.subElements[0].addClass('rounded');
    }
    for (let i = this.subElements.length - 1; i >= 0; i--) {
      this.subElements[i].style('width', '48px');
      i == 0 ? this.subElements[i].style('height', '48px') : this.subElements[i].style('height', '50px');
      this.subElements[i].parent(this.element);
    }
    this.element.attribute('title', this.getTitle());
    this.element.parent(parent);
  }

  getTitle() {
    let title = this.name;
    if (this.originalColor != null) {
      title += "<br>";
      title += `input: ${red(this.originalColor)}, ${green(this.originalColor)}, ${blue(this.originalColor)}`;
    }
    if (this.outputColor != null) {
      title += "<br>";
      title += `output: ${red(this.outputColor)}, ${green(this.outputColor)}, ${blue(this.outputColor)}`;
    }
    if (this.originalColor != null && this.outputColor != null) {
      title += "<br>";
      title += `error: ${this.calculateError()}`;
    }
    return title;
  }

  calculateError() {
    let error = 0;
    error += abs(red(this.originalColor) - red(this.outputColor));
    error += abs(green(this.originalColor) - green(this.outputColor));
    error += abs(blue(this.originalColor) - blue(this.outputColor));
    error /= 3;
    return nf(map(error, 0, 255, 0, 1), 0, 5);
  }

  update(c) {
    this.outputColor = c;
    this.subElements[0].style('background-color', this.outputColor);
    this.element.attribute('data-original-title', this.getTitle());
  }

}
