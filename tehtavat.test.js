const { gcd, murtolukujenSumma} = require('./tehtavat');


describe("gcd", () => {
  test('gcd of 2 and 2 should be 2', () => {
    expect(gcd(2, 2)).toBe(2);
  });

  test('gcd of 2 and 4 should be 2', () => {
    expect(gcd(2, 4)).toBe(2);
  });

  test('gcd of 3 and 7 should be 1', () => {
    expect(gcd(7, 3)).toBe(1);
  });

  test('gcd of -2 and 2 should be 2', () => {
    expect(gcd(-2, 2)).toBe(2);
  });

  test('gcd of 3 and 0 should be 3', () => {
    expect(gcd(3, 0)).toBe(3);
  });

  test('gcd of 0 and 0 should be 0', () => {
    expect(gcd(0, 0)).toBe(0);
  });


});

describe("murtolukujenSumma", () => {

  test('1/4 + 1/4 = 1/2', () => {
      expect(murtolukujenSumma(1,4,1,4)).toStrictEqual([1,2]);
    });

    test('1/2 + 1/2 = 1', () => {
      expect(murtolukujenSumma(1,2,1,2)).toStrictEqual([1,1]);
    });

    test('3/2 + 1/2 = 1', () => {
      expect(murtolukujenSumma(3,2,1,2)).toStrictEqual([2,1]);
    });

    test('-5/4 + 1/2 = -3/4', () => {
      expect(murtolukujenSumma(-5,4,1,2)).toStrictEqual([-3,4]);
    });

    test('-1/2 + 1/2 = 0', () => {
      expect(murtolukujenSumma(-1,2,1,2)).toStrictEqual([0,1]);
    });

});