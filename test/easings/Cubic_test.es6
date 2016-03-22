/* eslint-env mocha, node */
import {expect} from 'chai';

import CubicEasing from '../../src/easings/Cubic.es6';

describe('easings', () => {
  describe('Cubic', () => {
    it('should interpolate cubical', () => {
      const easing = new CubicEasing('in');
      for (let i = 0; i < 1; i += 0.1) {
        expect(easing.getValueForProgress(i)).to.equal(Math.pow(i, 3));
      }
    });
  });
});
