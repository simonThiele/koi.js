/* eslint-env mocha, node */
import {expect} from 'chai';

import QuadraticEasing from '../../src/easings/Quadratic.es6';

describe('easings', () => {
  describe('Quadratic', () => {
    it('should interpolate cubical', () => {
      const easing = new QuadraticEasing('in');
      for (let i = 0; i < 1; i += 0.1) {
        expect(easing.getValueForProgress(i)).to.equal(Math.pow(i, 2));
      }
    });
  });
});
