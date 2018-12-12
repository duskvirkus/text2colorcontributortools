"use strict";
let inputTable;
let outputTable;

const NOCHANGE = 0;
const LOWER = 1;
const UPPER = 2;
const START = 3;

function preload() {
  loadInputTable();
}

function loadInputTable() {
  if (typeof inputTablePath == 'undefined') {
    alert("ERROR: inputTablePath is undefined! It should be defined in the settings.js document. Please see Contributing Guidelines for more directions.");
    window.stop();
  } else {
    inputTable = loadTable(inputTablePath, 'csv', 'header');
    console.log("INFO: inputTable was sucessfully loaded.");
  }
}

function setup() {
  noCanvas();
  setupDownloadButton();
  //createOutputTable();
  //saveTable(outputTable, outputTableName);
}

function setupDownloadButton() {
  select('#download').mousePressed(downloadTable);
}

function downloadTable() {
  createOutputTable();
  saveOutputTable();
}

function saveOutputTable() {
  let fileName = select('#filename').value();
  if (fileName === "") fileName = "Training";
  fileName += ".csv";
  saveTable(outputTable, fileName);
}

function createOutputTable() {
  outputTable = new p5.Table();
  createOutputTableLabels();
  if (select('#nochange').checked()) transferToOutputTable(NOCHANGE);
  if (select('#lower').checked()) transferToOutputTable(LOWER);
  if (select('#upper').checked()) transferToOutputTable(UPPER);
  if (select('#start').checked()) transferToOutputTable(START);
}

function createOutputTableLabels() {
  for (let i = 0; i < 16; i++) {
    let label = 'text';
    outputTable.addColumn(`${label}-${i}`);
  }
  for (let i = 0; i < 3; i++) {
    let label;
    if (i == 0) label = 'r';
    if (i == 1) label = 'g';
    if (i == 2) label = 'b';
    for (let j = 0; j < 32; j++) {
      outputTable.addColumn(`${label}-${j}`);
    }
  }
  console.log("INFO: sucessfully created labels for outputTable.")
}

function transferToOutputTable(mode) {
  if (!mode) mode = NOCHANGE;
  for (let i = 0; i < inputTable.getRowCount(); i++) {
    let row = outputTable.addRow();
    let inputText = inputTable.getString(i, 0);
    if (mode === LOWER) inputText = inputText.toLowerCase();
    if (mode === UPPER) inputText = inputText.toUpperCase();
    if (mode === START) inputText = startCase(inputText);
    let text = hashText(inputText);
    for (let j = 0; j < text.length; j++) {
      row.setNum(`text-${j}`, text[j]);
    }
    let r = multiHotHex(inputTable.getNum(i, 1));
    let g = multiHotHex(inputTable.getNum(i, 2));
    let b = multiHotHex(inputTable.getNum(i, 3));
    for (let j = 0; j < r.length; j++) {
      row.setNum(`r-${j}`, r[j]);
      row.setNum(`g-${j}`, g[j]);
      row.setNum(`b-${j}`, b[j]);
    }
  }
  console.log("INFO: sucessfully transfered data to outputTable.")
}

function startCase(text) {
  if (text.length == 0) return "";
  let output = text.charAt(0).toUpperCase();
  for (let i = 1; i < text.length; i++) {
    if (text.charAt(i - 1) == " ") {
      output += text.charAt(i).toUpperCase();
    } else {
      output += text.charAt(i).toLowerCase();
    }
  }
  return output;
}
