import _ from 'lodash';

import LinearEasing from './easings/Linear.es6';
import Time from './Time.es6';


const fixedMethod = () => {};

export default class Animation {

  constructor({
    from,
    to,
    animationTime = 1000,
    repeating = 0,
    easing = new LinearEasing() }) {
    this.from = from;
    this.to = to;
    this.easing = easing;
    this.repeating = repeating;
    this.animationTime = animationTime;
    this.time = new Time();

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
    this.numRepeatings = 0;
    this.progress = 0;
    this.time.start();

    this.update(0);
  }

  update(highResTimestamp) {
    if (!this.animationInProgress) {
      return;
    }

    requestAnimationFrame(this.update);

    this.time.update(highResTimestamp);

    this.progress += this.time.getDeltaTime() * (1000 / this.animationTime); // ms -> s
    this.progress = Math.min(this.progress, 1); // [0, 1]

    // interpolate between props
    this.interpolateObject(this.progress);
    this.onUpdateCallback(this.interpolationObject, this.progress);

    if (this.progress === 1) {
      if (this.numRepeatings >= this.repeating) {
        this.stop();
      } else {
        this.progress = 0;
        this.interpolateObject(0);
        this.onUpdateCallback(this.interpolationObject, 0);
      }
      this.numRepeatings++;
    }
  }

  interpolateObject(progress) {
    // interpolate between props
    this.propsToAnimate.forEach(prop => {
      const from = this.from[prop];
      const to = this.to[prop];
      this.interpolationObject[prop] =
        from + (to - from) * this.easing.getValueForProgress(progress);
    });
  }

  stop() {
    this.animationInProgress = false;

    this.onStopCallback();
  }
}
