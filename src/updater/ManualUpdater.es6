export default class ManualUpdater {

  constructor(animation) {
    this.animation = animation;
  }

  start() {}

  update(deltaTime) {
    this.animation.update(deltaTime);
  }
}
