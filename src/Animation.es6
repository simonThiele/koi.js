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

    this.propsToAnimate = _.intersection(Object.keys(from), Object.keys(to))
                            .filter(property => typeof from[property] === 'number' &&
                                                typeof to[property] === 'number');

    // use the fixed method to avoid undefined checking
    this.onUpdateCallback = fixedMethod;
    this.onStartCallback = fixedMethod;
    this.onStopCallback = fixedMethod;

    this.update = this.update.bind(this);
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

    // clamp the progress between 0 and 1
    if (this.progress >= 1) {
      this.stop();
      this.progress = 1;
    }

    this.onUpdateCallback(this.easing.getValueForProgress(this.progress));
  }

  stop() {
    this.animationInProgress = false;
  }
}
