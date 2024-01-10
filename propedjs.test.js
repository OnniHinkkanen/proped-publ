const { gcd, fracSum, fracProd, fracQuot, formatAns, getFeedbackFrac} = require('./tehtavat');


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

describe("fracSum", () => {
  
  test('1/4 + 1/4 = 1/2', () => {
      expect(fracSum(1,4,1,4)).toStrictEqual([1,2]);
    });

    test('1/2 + 1/2 = 1', () => {
      expect(fracSum(1,2,1,2)).toStrictEqual([1,1]);
    });

    test('3/2 + 1/2 = 1', () => {
      expect(fracSum(3,2,1,2)).toStrictEqual([2,1]);
    });

    test('-5/4 + 1/2 = -3/4', () => {
      expect(fracSum(-5,4,1,2)).toStrictEqual([-3,4]);
    });

    test('1/2 - 5/4 = -3/4', () => {
      expect(fracSum(1,2,-5,4)).toStrictEqual([-3,4]);
    });

    test('-1/2 + 1/2 = 0', () => {
      expect(fracSum(-1,2,1,2)).toStrictEqual([0,1]);
    });

});

describe("fracProd", () => {
  
  test('1/4 * 1/2 = 1/8', () => {
    expect(fracProd(1,4,1,2)).toStrictEqual([1,8]);
  });

  test('2/4 * 2/4 = 1/4', () => {
    expect(fracProd(2,4,2,4)).toStrictEqual([1,4]);
  });

});

describe("getFeedbackFrac", () => {
 
  test('1/2 and 1/2 should be equal', () => {
    expect(getFeedbackFrac(['1','2'],[1,2])).toBe("Oikein!");
  });

  test('2/4 and 1/2 should be simplified', () => {
    expect(getFeedbackFrac(['2','4'],[1,2])).toBe("Vastaus ei ole sievimmässä mahdollisessa muodossa.");
  });

  test('20/12 and 2/1 should not be equal', () => {
    expect(getFeedbackFrac(['20','12'],[2,1])).toBe("Nyt meni jotakin pieleen!");
  });

  test('1/2 and 1/3 should not be equal', () => {
    expect(getFeedbackFrac(['1','2'],[1,3])).toBe("Nyt meni jotakin pieleen!");
  });
  
  test('1a/2 and 1/3 should not be equal', () => {
    expect(getFeedbackFrac(['1a','2'],[1,3])).toBe("Nyt meni jotakin pieleen!");
  });

  test('da/2 and 1/3 should not be equal', () => {
    expect(getFeedbackFrac(['da','2'],[1,3])).toBe("Syötteesi ei ole numeerisessa muodossa!");
  });

});

describe("formatAns", () => {
  
  test('=1/2 to [1,2]', () => {
    expect(formatAns("=1/2")).toStrictEqual(['1','2']);
  });

  test('1/2 to [1,2]', () => {
    expect(formatAns("1/2")).toStrictEqual(['1','2']);
  });

  test('12 to [12,1]', () => {
    expect(formatAns("12")).toStrictEqual(['12','1']);
  });

  test('12 to [12,1]', () => {
    expect(formatAns("=12")).toStrictEqual(['12','1']);
  });

  test('1/1/2 to [12,1]', () => {
    expect(formatAns("1/1/2")).toStrictEqual(['1','1','2']);
  });

  test('=-1/2 to [1,2]', () => {
    expect(formatAns("=-1/2")).toStrictEqual(['-1','2']);
  });


});