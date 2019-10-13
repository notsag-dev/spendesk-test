const assert = require('assert');
const {cardService} = require('../../services');

describe('Card service', () => {
  describe('getRandomNumString', () => {
    it('generates strings with proper length', () => {
      const num = cardService.getRandomNumString(16);
      assert.equal(num.length, 16);
    });
  });
});
