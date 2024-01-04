const tehtavat = require('./tehtavat');

test('gcd of 2 and 2 should be 2', () => {
  expect(tehtavat.gcd(2, 2)).toBe(2);
});

test('1/4 + 1/4 = 1/2', () => {
    expect(tehtavat.murtolukujenSumma(1,4,1,4)).toStrictEqual([1,2]);
  });