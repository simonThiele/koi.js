export default class Time {

  constructor() {
    this.timeOfLastFrameUpdate = 0;
    this.deltaTime = 0;
    this.timeNow = 0;
  }

  start() {
    this.timeNow = Date.now();
  }

  update(highResTimestamp) {
    this.timeNow = highResTimestamp;
    const deltaTimeInMs = (highResTimestamp - this.timeOfLastFrameUpdate);
    this.deltaTime = deltaTimeInMs / 1000; // in ms

    this.timeOfLastFrameUpdate = highResTimestamp;
  }

  getDeltaTime() {
    return this.deltaTime;
  }
}
