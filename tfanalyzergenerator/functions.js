mapOutputToRGB = (rgb) => {
  let rgbMapped = [];
  for (let i = 0; i < rgb.length; i++) {
    rgbMapped[i] = floor(map(rgb[i], 0, 1, 0, 255));
  }
  return rgbMapped;
}

stringToInput = (s) => {
	let input = [];
	for (let i = 0; i < 20; i++) {
		if (i < s.length) {
			input.push(s.charCodeAt(i));
		} else {
			input.push(0);
		}
	}
	return input;
}
