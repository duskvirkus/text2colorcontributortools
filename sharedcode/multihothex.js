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
