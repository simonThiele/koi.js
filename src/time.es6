let timeOfLastFrameUpdate = 0;
let deltaTime = 0;
let timeNow = 0;

export function start() {
  timeNow = Date.now();
}

export function update(highResTimestamp) {
  timeNow = highResTimestamp;
  const deltaTimeInMs = (timeNow - timeOfLastFrameUpdate);
  deltaTime = deltaTimeInMs / 1000; // in ms

  timeOfLastFrameUpdate = timeNow;
}

export function getDeltaTime() {
  return deltaTime;
}
