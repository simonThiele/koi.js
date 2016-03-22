# koi.js
Key Object Interpolation

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## How to use
You can use this library in your browser and node application

### Browser
Download the build/koi.js file and add it to your site
```html
<script src="koi.js"></script>
```

### Node
Run
```javascript
npm install koi.js
```
and use it in you code
```javascript
var koi = require('koi.js');
```

## How to build src

``` javascript
npm install
npm run build
```

## Run tests

``` javascript
npm test
```

## Examples

### Browser
HTML examples be found unter the examples folder (check the console maybe).
```html
<script src="koi.js"></script>
<script>
  var animation = new koi.Animation({
    from: {x: 1, y: 0},
    to: {x: -1, y: 10}
  });
  animation.onStart(progress => console.log('start'));
  animation.onUpdate(progress => console.log(progress));
  animation.onStop(progress => console.log('stop'));
  animation.start();
</script>

```
### Node
Because there is no autoupdate via requestAnimationFrame, you need to disable autoUpdate for node usage.
``` javascript
var koi = require('koi.js');

var animation = new koi.Animation({
  from: {x: 0},
  to: {x: 1},
  autoUpdate: false,
  animationTime: 1000 });

animation.onUpdate((interpolatedObject, progress) => {
  console.log(progress);
});

animation.start();
```
Remember to call update manually with
```javascript
animation.updater.update(YOUR_DELTA_TIME_HERE);
```

[npm-image]: https://img.shields.io/npm/v/koi.js.svg
[npm-url]: https://npmjs.org/package/koi.js
[downloads-image]: https://img.shields.io/npm/dm/koi.js.svg
[downloads-url]: https://npmjs.org/package/koi.js
