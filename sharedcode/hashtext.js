"use strict";
function hashText(text, hashSize) {
  if (!hashSize) hashSize = 16;
  let hashed = [];
  for (let i = 0; i < hashSize; i++) {
    hashed[i] = 0;
  }
  for (let i = 0; i < text.length; i++) {
    hashed[i % hashSize] += text.charCodeAt(i);
  }
  return hashed;
}
