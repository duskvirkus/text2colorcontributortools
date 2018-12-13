"use strict";
let trainingTable;
let testingTable = null;
let trainingInput;
let trainingOutput;
let testingInput;
let trainingSwatches;
let testingSwatches;
let network;
let progressBar;
let startTime;

function preload() {
  loadTables();
}

function loadTables() {
  if (typeof trainingTablePath == 'undefined') {
    alert("ERROR: trainingTablePath is undefined! It should be defined in the settings.js document. Please see Contributing Guidelines for more directions.");
    window.stop();
  } else {
    trainingTable = loadTable(trainingTablePath, 'csv', 'header');
    console.log("INFO: trainingTable was sucessfully loaded.");
  }
  if (typeof testingTablePath == 'undefined') {
    console.log("WARN: testingTablePath is undefined! This is an optional setting. If you intended to use testing data, define it in settings.js Please see Contributing Guidelines for more directions.");
  } else {
    testingTable = loadTable(testingTablePath, 'csv');
    console.log("INFO: testingTable was sucessfully loaded.");
  }
}

function setup() {
  noCanvas();
  startTime = Date.now();
  setupButtons();
  if (display) {
    createSwatches();
  } else {
    select('#trainingSwatchesTitle').addClass('sr-only');
    select('#testingSwatchesTitle').addClass('sr-only');
  }
  convertTrainingTableToTrainingData();
  if (testingTable) {
  	convertTestingTableToTestingInput();
  }
  createBar();
  createNetwork();
  noLoop();
}

function setupButtons() {
  select('#start').mousePressed(train);
  select('#save').mousePressed(saveNetwork);
}

function saveNetwork() {
  let fileName = select('#filename').value();
  if (fileName === "") fileName = "model" + floor(random(1000000));
  network.save(`downloads://${fileName}`)
    .then(results => console.log(results))
    .catch(error => console.log(error));
}

function createSwatches() {
  trainingSwatches = new SwatchCollection(trainingTable, select('#trainingSwatches'));
  if (testingTable) {
    testingSwatches = new SwatchCollection(testingTable, select('#testingSwatches'));
  }
  enableTooltips();
}

function createBar() {
  progressBar = new ProgressBar(select('#progressBar'));
}

function createNetwork() {
  network = tf.sequential();
	network.add(tf.layers.dense({
		units: 60,
		inputShape: [16],
		activation: 'sigmoid'
	}));
	network.add(tf.layers.dense({
		units: 120,
		activation: 'sigmoid'
	}));
	network.add(tf.layers.dense({
		units: 96,
		activation: 'sigmoid'
	}));
	const optimizer = tf.train.adam(0.0001);
	network.compile({
		optimizer: optimizer,
		loss: tf.losses.meanSquaredError
	});
	network.summary();
}

function convertTrainingTableToTrainingData() {
	let input = [];
	let output = [];
	for (let row = 0; row < trainingTable.getRowCount(); row++) {
    let rowInput = [];
    for (let j = 0; j < 16; j++) {
      rowInput.push(trainingTable.getNum(row, j + 1));
    }
    input.push(rowInput);
    let rowOutput = [];
    for (let j = 0; j < 96; j++) {
      rowOutput.push(trainingTable.getNum(row, j + 17));
    }
    output.push(rowOutput);
	}
	trainingInput = tf.tensor2d(input);
	trainingOutput = tf.tensor2d(output);
}

function convertTestingTableToTestingInput() {
	let input = [];
	for (let row = 0; row < testingTable.getRowCount(); row++) {
		let s = testingTable.getString(row, 0);
		input.push(hashText(s));
	}
	testingInput = tf.tensor2d(input);
}

function train() {
	tf.tidy(() => {
		trainNetwork()
			.then((results) => {
        progressBar.update(results.history.loss[0]);
        updateTimeRunning();
        if (display) {
          updateTrainingSwatches();
          if (testingTable) {
    				updateTestingSwatches();
          }
        }
        if (results.history.loss[0] > autoFinish) {
				  train();
        } else {
          saveNetwork();
          console.log("INFO: Done!");
        }
			})
			.catch(error => console.log(error));
	});
}

function updateTimeRunning() {
  let timeRunning = Date.now() - startTime;
  select('#timeRunning').html(`Time Running: ${floor(timeRunning / 60000)} minutes, ${floor((timeRunning % 60000) / 1000)} seconds`);
}

function trainNetwork() {
	return network.fit(trainingInput, trainingOutput, {
		shuffle: true,
		epochs: 2
	});
}

function updateTrainingSwatches() {
	tf.tidy(() => {
		let output = network.predict(trainingInput).dataSync();
    trainingSwatches.update(output);
	});
}

function updateTestingSwatches() {
	tf.tidy(() => {
		let output = network.predict(testingInput).dataSync();
    testingSwatches.update(output);
	});
}

function enableTooltips() {
  $(() => {
    $('[data-toggle="tooltip"]').tooltip()
  })
}
