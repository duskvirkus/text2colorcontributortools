"use strict";
class ProgressBar {

  constructor(parent) {
    this.parent = parent;
    this.labelContainers = [];
    this.labels = [];
    this.labelContainers[0] = createDiv();
    this.labelContainers[0].addClass('mt-3');
    this.labelContainers[0].addClass('row');
    this.labelContainers[0].parent(this.parent);
    this.labels[0] = createDiv('1');
    this.labels[0].addClass('col');
    this.labels[0].addClass('text-left');
    this.labels[0].parent(this.labelContainers[0]);
    this.labels[1] = createDiv('1');
    this.labels[1].addClass('col');
    this.labels[1].addClass('text-center');
    this.labels[1].parent(this.labelContainers[0]);
    this.labels[2] = createDiv(autoFinish);
    this.labels[2].addClass('col');
    this.labels[2].addClass('text-right');
    this.labels[2].parent(this.labelContainers[0]);
    this.bar = createDiv();
    this.bar.addClass('mb-3');
    this.bar.addClass('progress');
    this.bar.parent(this.parent);
    this.innerBar = createDiv();
    this.innerBar.addClass('progress-bar');
    this.innerBar.addClass('bg-dark');
    this.innerBar.addClass('progress-bar-striped');
    this.innerBar.addClass('progress-bar-animated');
    this.innerBar.parent(this.bar);
    this.count = 0;
    this.startingLoss;
  }

  update(loss) {
    if (this.count <= 5) {
      this.startingLoss = loss;
      this.labels[0].html(nf(this.startingLoss, 0, 5));
      this.count++;
    }
    this.labels[1].html(nf(loss, 0, 5));
    this.innerBar.style('width', `${map(loss, this.startingLoss, autoFinish, 0, 100)}%`);
  }

}
