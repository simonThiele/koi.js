import Time from '../Time.es6';

export default class RequestAnimationFrameUpdater {

  constructor(animation) {
    this.animation = animation;
    this.time = new Time();

    this.update = this.update.bind(this);
  }

  start() {
    this.time.start();
    this.update(0);
  }

  update(highResTimestamp) {
    if (!this.animation.animationInProgress) {
      return;
    }

    /* eslint-disable no-undef */
    requestAnimationFrame(this.update);

    this.time.update(highResTimestamp);
    this.animation.update(this.time.getDeltaTime());
  }
}
