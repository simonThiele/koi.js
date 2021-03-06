/* eslint-env mocha, node */
import {expect} from 'chai';

import LinearEasing from '../../src/easings/Linear.es6';

describe('easings', () => {
  describe('Linear', () => {
    it('should interpolate linear', () => {
      const easing = new LinearEasing();
      for (let i = 0; i < 1; i += 0.1) {
        expect(easing.getValueForProgress(i)).to.equal(i);
      }
    });
  });
});
