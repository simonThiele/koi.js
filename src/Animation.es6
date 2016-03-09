import _ from 'lodash';

import LinearEasing from './easings/Linear.es6';
import * as time from './time.es6';


const fixedMethod = () => {};

export default class Animation {

  constructor({
    from,
    to,
    animationTime = 1000,
    easing = new LinearEasing() }) {
    this.from = from;
    this.to = to;
    this.easing = easing;
    this.animationTime = animationTime;

    this.getObjectToInterpolate(from, to);

    // use the fixed method to avoid undefined checking
    this.onUpdateCallback = fixedMethod;
    this.onStartCallback = fixedMethod;
    this.onStopCallback = fixedMethod;

    this.update = this.update.bind(this);
  }

  getObjectToInterpolate(from, to) {
    this.propsToAnimate = _.intersection(Object.keys(from), Object.keys(to))
                            .filter(property => typeof from[property] === 'number' &&
                                                typeof to[property] === 'number');

    this.interpolationObject = {};
    this.propsToAnimate.forEach(property => {
      this.interpolationObject[property] = from[property];
    });
  }

  onStart(callback) {
    this.onStartCallback = callback;
  }

  onUpdate(callback) {
    this.onUpdateCallback = callback;
  }

  onStop(callback) {
    this.onStopCallback = callback;
  }

  start() {
    this.onStartCallback();

    this.animationInProgress = true;
    this.progress = 0;
    time.start();

    this.update(0);
  }

  update(highResTimestamp) {
    if (!this.animationInProgress) {
      return;
    }

    requestAnimationFrame(this.update);

    time.update(highResTimestamp);

    this.progress += time.getDeltaTime() * (this.animationTime / 1000); // ms -> s
    this.progress = Math.min(this.progress, 1); // [0, 1]

    // interpolate between props
    this.propsToAnimate.forEach(property => {
      this.interpolationObject[property] =
        this.from[property] + (this.to[property] - this.from[property]) * this.progress;
    });
    this.onUpdateCallback(this.interpolationObject);

    if (this.progress === 1) {
      this.stop();
    }
  }

  stop() {
    this.animationInProgress = false;

    this.onStopCallback();
  }
}
