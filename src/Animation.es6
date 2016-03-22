import RAFUpdater from './updater/RequestAnimationFrameUpdater';
import ManualUpdater from './updater/ManualUpdater';
import LinearEasing from './easings/Linear.es6';

const fixedMethod = () => {};

export default class Animation {

  constructor({
    from,
    to,
    animationTime = 1000,
    repeating = 0,
    autoUpdate = true,
    easing = new LinearEasing()}) {
    this.from = from;
    this.to = to;
    this.easing = easing;
    this.repeating = repeating;
    this.animationTime = animationTime;
    this.updater = autoUpdate ? new RAFUpdater(this) : new ManualUpdater(this);

    this.getObjectToInterpolate(from, to);

    // use the fixed method to avoid undefined checking
    this.onUpdateCallback = fixedMethod;
    this.onStartCallback = fixedMethod;
    this.onStopCallback = fixedMethod;

    this.update = this.update.bind(this);
  }

  getObjectToInterpolate(from, to) {
    this.propsToAnimate = this.intersection(Object.keys(from), Object.keys(to))
                              .filter(property =>
                                typeof from[property] === 'number' &&
                                typeof to[property] === 'number');

    this.interpolationObject = {};
    this.propsToAnimate.forEach(property => {
      this.interpolationObject[property] = from[property];
    });
  }

  intersection(a1, a2) {
    return a1.filter(prop => a2.indexOf(prop) >= 0);
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
    this.updater.start();
  }

  update(deltaTime) {
    if (!this.animationInProgress) {
      return;
    }

    this.progress += (deltaTime / 1000) * (1000 / this.animationTime); // ms -> s
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
