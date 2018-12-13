"use strict";
function multiHotHex(number, hexDigits) {
  if (!hexDigits) hexDigits = 2;
  let hex = number.toString(16);
  let output = [];
  while (hex.length < hexDigits) {
    let zero = 0;
    hex = zero.toString(16) + hex;
  }
  while (hex.length > hexDigits) {
    hex = hex.substring(1, hex.length);
  }
  for (let i = 0; i < hex.length; i++) {
    let hot = parseInt(hex.charAt(i), 16)
    for (let j = 0; j < 16; j++) {
      if (j == hot) {
        output.push(1);
      } else {
        output.push(0)
      }
    }
  }
  return output;
}

function multiHotHexToColor(input, i) {
  let hex = '';
  for (let i = 0; i < 6; i++) {
    let offset = i * 16;
    let record = 0;
    let index = 0;
    for (let j = 0; j < 16; j++) {
      if (input[offset + j] > record) {
        record = input[offset + j];
        index = j;
      }
    }
    //console.assert(index != null, i);
    hex += index.toString(16);
  }
  return hexToColor(hex);
}

function hexToColor(hex) {
  if (hex.length != 6) return null;
  return color(parseInt(hex.substring(0,2), 16), parseInt(hex.substring(2,4), 16), parseInt(hex.substring(4,6), 16));
}
