/* eslint-disable no-undef */

import Animation from './Animation.es6';
registerModule('Animation', Animation);

import LinearEasing from './easings/Linear.es6';
registerModule('LinearEasing', LinearEasing);

import CubicEasing from './easings/Cubic.es6';
registerModule('CubicEasing', CubicEasing);

import QuadraticEasing from './easings/Quadratic.es6';
registerModule('QuadraticEasing', QuadraticEasing);

/**
 * @param {string} modulename the name to access the property
 * @param {object} module the module to be registered
 * @description makes the module usable in different environments (node, browser)
 */
function registerModule(modulename, module) {
  window[modulename] = module;
}
