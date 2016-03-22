/* eslint-disable no-undef */

import Animation from './Animation.es6';
import CubicEasing from './easings/Cubic.es6';
import LinearEasing from './easings/Linear.es6';
import QuadraticEasing from './easings/Quadratic.es6';

const koi = {
  Animation,
  CubicEasing,
  LinearEasing,
  QuadraticEasing
};

window.koi = koi;

// UMD (Universal Module Definition)
(function(root) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() {
      return koi;
    });
    console.log('define');
  } else if (typeof module !== 'undefined' && typeof exports === 'object') {
    // Node.js
    module.exports = koi;
    console.log('module');
  } else if (root !== undefined) {
    // Global variable
    root.koi = koi;
    console.log('global');
  }
})(this);
