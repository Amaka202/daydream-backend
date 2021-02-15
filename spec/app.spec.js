const Add = require('../app');

describe('Add functionality', () => {
  it('calculates that x + y = z', () => {
    expect(Add(4, 5)).toEqual(9);
    expect(Add(14, -5)).toEqual(9);
  });
  it('calculates that x + y != z', () => {
    expect(Add(14, -5)).not.toEqual(9);
  });
});
