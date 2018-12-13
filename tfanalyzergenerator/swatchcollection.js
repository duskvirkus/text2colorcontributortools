"use strict";
class SwatchCollection {

  constructor(table, parent) {
    this.parent = parent;
    this.swatches = [];
    for (let row = 0; row < table.getRowCount(); row++) {
      if (table.getColumnCount() > 1) {
        let hotHex = [];
        for (let i = 0; i < 96; i++) {
          hotHex.push(trainingTable.getNum(row, i + 17));
        }
        let c = multiHotHexToColor(hotHex);
        this.swatches.push(new Swatch(this.parent, table.getString(row, 0), c));
      } else {
        this.swatches.push(new Swatch(this.parent, table.getString(row, 0)));
      }
    }
  }

  update(output) {
    let counter = 0;
    for (let i = 0; i < this.swatches.length; i++) {
      let hotHex = [];
      for (let j = 0; j < 96; j++) {
        hotHex.push(output[counter]);
        counter++;
      }
      this.swatches[i].update(multiHotHexToColor(hotHex, i));
    }
  }

}
