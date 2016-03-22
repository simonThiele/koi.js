/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint-disable no-undef */

	var _Animation = __webpack_require__(2);

	var _Animation2 = _interopRequireDefault(_Animation);

	var _Cubic = __webpack_require__(7);

	var _Cubic2 = _interopRequireDefault(_Cubic);

	var _Linear = __webpack_require__(6);

	var _Linear2 = _interopRequireDefault(_Linear);

	var _Quadratic = __webpack_require__(8);

	var _Quadratic2 = _interopRequireDefault(_Quadratic);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var koi = {
	  Animation: _Animation2.default,
	  CubicEasing: _Cubic2.default,
	  LinearEasing: _Linear2.default,
	  QuadraticEasing: _Quadratic2.default
	};

	window.koi = koi;

	// UMD (Universal Module Definition)
	(function (root) {
	  if (true) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return koi;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	    // Node.js
	    module.exports = koi;
	  } else if (root !== undefined) {
	    // Global variable
	    root.koi = koi;
	  }
	})(undefined);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _RequestAnimationFrameUpdater = __webpack_require__(3);

	var _RequestAnimationFrameUpdater2 = _interopRequireDefault(_RequestAnimationFrameUpdater);

	var _ManualUpdater = __webpack_require__(5);

	var _ManualUpdater2 = _interopRequireDefault(_ManualUpdater);

	var _Linear = __webpack_require__(6);

	var _Linear2 = _interopRequireDefault(_Linear);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var fixedMethod = function fixedMethod() {};

	var Animation = function () {
	  function Animation(_ref) {
	    var from = _ref.from;
	    var to = _ref.to;
	    var _ref$animationTime = _ref.animationTime;
	    var animationTime = _ref$animationTime === undefined ? 1000 : _ref$animationTime;
	    var _ref$repeating = _ref.repeating;
	    var repeating = _ref$repeating === undefined ? 0 : _ref$repeating;
	    var _ref$autoUpdate = _ref.autoUpdate;
	    var autoUpdate = _ref$autoUpdate === undefined ? true : _ref$autoUpdate;
	    var _ref$easing = _ref.easing;
	    var easing = _ref$easing === undefined ? new _Linear2.default() : _ref$easing;

	    _classCallCheck(this, Animation);

	    this.from = from;
	    this.to = to;
	    this.easing = easing;
	    this.repeating = repeating;
	    this.animationTime = animationTime;
	    this.updater = autoUpdate ? new _RequestAnimationFrameUpdater2.default(this) : new _ManualUpdater2.default(this);

	    this.getObjectToInterpolate(from, to);

	    // use the fixed method to avoid undefined checking
	    this.onUpdateCallback = fixedMethod;
	    this.onStartCallback = fixedMethod;
	    this.onStopCallback = fixedMethod;

	    this.update = this.update.bind(this);
	  }

	  _createClass(Animation, [{
	    key: 'getObjectToInterpolate',
	    value: function getObjectToInterpolate(from, to) {
	      var _this = this;

	      this.propsToAnimate = this.intersection(Object.keys(from), Object.keys(to)).filter(function (property) {
	        return typeof from[property] === 'number' && typeof to[property] === 'number';
	      });

	      this.interpolationObject = {};
	      this.propsToAnimate.forEach(function (property) {
	        _this.interpolationObject[property] = from[property];
	      });
	    }
	  }, {
	    key: 'intersection',
	    value: function intersection(a1, a2) {
	      return a1.filter(function (prop) {
	        return a2.indexOf(prop) >= 0;
	      });
	    }
	  }, {
	    key: 'onStart',
	    value: function onStart(callback) {
	      this.onStartCallback = callback;
	    }
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(callback) {
	      this.onUpdateCallback = callback;
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop(callback) {
	      this.onStopCallback = callback;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.onStartCallback();

	      this.animationInProgress = true;
	      this.numRepeatings = 0;
	      this.progress = 0;
	      this.updater.start();
	    }
	  }, {
	    key: 'update',
	    value: function update(deltaTime) {
	      if (!this.animationInProgress) {
	        return;
	      }

	      this.progress += deltaTime / 1000 * (1000 / this.animationTime); // ms -> s
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
	  }, {
	    key: 'interpolateObject',
	    value: function interpolateObject(progress) {
	      var _this2 = this;

	      // interpolate between props
	      this.propsToAnimate.forEach(function (prop) {
	        var from = _this2.from[prop];
	        var to = _this2.to[prop];
	        _this2.interpolationObject[prop] = from + (to - from) * _this2.easing.getValueForProgress(progress);
	      });
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.animationInProgress = false;

	      this.onStopCallback();
	    }
	  }]);

	  return Animation;
	}();

	exports.default = Animation;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Time = __webpack_require__(4);

	var _Time2 = _interopRequireDefault(_Time);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RequestAnimationFrameUpdater = function () {
	  function RequestAnimationFrameUpdater(animation) {
	    _classCallCheck(this, RequestAnimationFrameUpdater);

	    this.animation = animation;
	    this.time = new _Time2.default();

	    this.update = this.update.bind(this);
	  }

	  _createClass(RequestAnimationFrameUpdater, [{
	    key: 'start',
	    value: function start() {
	      this.time.start();
	      this.update(0);
	    }
	  }, {
	    key: 'update',
	    value: function update(highResTimestamp) {
	      if (!this.animation.animationInProgress) {
	        return;
	      }

	      /* eslint-disable no-undef */
	      requestAnimationFrame(this.update);

	      this.time.update(highResTimestamp);
	      this.animation.update(this.time.getDeltaTime());
	    }
	  }]);

	  return RequestAnimationFrameUpdater;
	}();

	exports.default = RequestAnimationFrameUpdater;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Time = function () {
	  function Time() {
	    _classCallCheck(this, Time);

	    this.timeOfLastFrameUpdate = 0;
	    this.deltaTime = 0;
	    this.timeNow = 0;
	  }

	  _createClass(Time, [{
	    key: "start",
	    value: function start() {
	      this.timeNow = Date.now();
	    }
	  }, {
	    key: "update",
	    value: function update(highResTimestamp) {
	      this.timeNow = highResTimestamp;
	      var deltaTimeInMs = highResTimestamp - this.timeOfLastFrameUpdate;
	      this.deltaTime = deltaTimeInMs;

	      this.timeOfLastFrameUpdate = highResTimestamp;
	    }
	  }, {
	    key: "getDeltaTime",
	    value: function getDeltaTime() {
	      return this.deltaTime;
	    }
	  }]);

	  return Time;
	}();

	exports.default = Time;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ManualUpdater = function () {
	  function ManualUpdater(animation) {
	    _classCallCheck(this, ManualUpdater);

	    this.animation = animation;
	  }

	  _createClass(ManualUpdater, [{
	    key: "start",
	    value: function start() {}
	  }, {
	    key: "update",
	    value: function update(deltaTime) {
	      this.animation.update(deltaTime);
	    }
	  }]);

	  return ManualUpdater;
	}();

	exports.default = ManualUpdater;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LinearEasing = function () {
	  function LinearEasing() {
	    _classCallCheck(this, LinearEasing);
	  }

	  _createClass(LinearEasing, [{
	    key: "getValueForProgress",
	    value: function getValueForProgress(progress) {
	      return progress;
	    }
	  }]);

	  return LinearEasing;
	}();

	exports.default = LinearEasing;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CubicEasing = function CubicEasing(type) {
	  _classCallCheck(this, CubicEasing);

	  switch (type) {
	    case 'in':
	      this.getValueForProgress = function (p) {
	        return p * p * p;
	      };
	      break;
	    case 'out':
	      this.getValueForProgress = function (p) {
	        var pt = p - 1;
	        return pt * pt * pt + 1;
	      };
	      break;
	    case 'inOut':
	      this.getValueForProgress = function (p) {
	        var pt = p * 2;
	        if (pt < 1) {
	          return 0.5 * pt * pt * pt;
	        }

	        var ptt = pt - 2;
	        return 0.5 * (ptt * ptt * ptt + 2);
	      };
	      break;
	    default:
	      this.getValueForProgress = function (p) {
	        return p;
	      };
	  }
	};

	exports.default = CubicEasing;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QuadraticEasing = function QuadraticEasing(type) {
	  _classCallCheck(this, QuadraticEasing);

	  switch (type) {
	    case 'in':
	      this.getValueForProgress = function (p) {
	        return p * p;
	      };
	      break;
	    case 'out':
	      this.getValueForProgress = function (p) {
	        return p * (2 - p);
	      };
	      break;
	    case 'inOut':
	      this.getValueForProgress = function (p) {
	        var pt = p * 2;
	        if (pt < 1) {
	          return 0.5 * pt * pt;
	        }

	        var ptt = pt - 1;
	        return -0.5 * (ptt * (ptt - 2) - 1);
	      };
	      break;
	    default:
	      this.getValueForProgress = function (p) {
	        return p;
	      };
	  }
	};

	exports.default = QuadraticEasing;

/***/ }
/******/ ]);