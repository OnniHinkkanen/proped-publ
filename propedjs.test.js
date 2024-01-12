const { gcd, 
  fracSum, 
  fracProd, 
  fracQuot, 
  formatFracAns, 
  fracFeedback, 
  decSumFeedback, 
  stringReplace,
  sievennys,
  virhe,
  oikein,
  syoteVast} = require('./propedjs');

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

  test('5/2 * 10/5 = 5/1', () => {
    expect(fracProd(5,2,10,5)).toStrictEqual([5,1]);
  });

  test('10/8 * 4/9 = 5/9', () => {
    expect(fracProd(10,8,4,9)).toStrictEqual([5,9]);
  });

});

describe("fracFeedback", () => {

  test('50/10 and 5/1 should not be equal', () => {
    expect(fracFeedback(['50','10'],[5,1])).toBe(sievennys);
  });

  test('40/36 and 5/9 should not be equal', () => {
    expect(fracFeedback(['40','36'],[5,9])).toBe(virhe);
  });

  test('1/2 and 1/2 should be equal', () => {
    expect(fracFeedback(['1','2'],[1,2])).toBe(oikein);
  });

  test('2/4 and 1/2 should be simplified', () => {
    expect(fracFeedback(['2','4'],[1,2])).toBe(sievennys);
  });

  test('20/12 and 2/1 should not be equal', () => {
    expect(fracFeedback(['20','12'],[2,1])).toBe(virhe);
  });

  test('1/2 and 1/3 should not be equal', () => {
    expect(fracFeedback(['1','2'],[1,3])).toBe(virhe);
  });
  
  test('1a/2 and 1/3 should not be equal', () => {
    expect(fracFeedback(['1a','2'],[1,3])).toBe(virhe);
  });

  test('da/2 and 1/3 should not be equal', () => {
    expect(fracFeedback(['da','2'],[1,3])).toBe(syoteVast);
  });

});

describe("formatFracAns", () => {
  
  test('=1/2 to [1,2]', () => {
    expect(formatFracAns("=1/2")).toStrictEqual(['1','2']);
  });

  test('1/2 to [1,2]', () => {
    expect(formatFracAns("1/2")).toStrictEqual(['1','2']);
  });

  test('12 to [12,1]', () => {
    expect(formatFracAns("12")).toStrictEqual(['12','1']);
  });

  test('12 to [12,1]', () => {
    expect(formatFracAns("=12")).toStrictEqual(['12','1']);
  });

  test('1/1/2 to [12,1]', () => {
    expect(formatFracAns("1/1/2")).toStrictEqual(['1','1','2']);
  });

  test('=-1/2 to [1,2]', () => {
    expect(formatFracAns("=-1/2")).toStrictEqual(['-1','2']);
  });

});

describe("decSumFeedback", () => {

  test('0.11 + 0.23 to be 0.34', () => {
    expect(decSumFeedback(0.11, 0.23, '0.34')).toBe("Oikein!");
  });

  test('0.11 + 0.23 to be 0.34', () => {
    expect(decSumFeedback(0.114, 0.483, '0,597')).toBe("Oikein!");
  });
  
  test('-0.11 + 0.23 to be 0.12', () => {
    expect(decSumFeedback(-0.11, 0.23, '0.12')).toBe("Oikein!");
  });

  test('0.105 + 0.365 to be 0.470', () => {
    expect(decSumFeedback(0.105, 0.365, '=0,470')).toBe("Oikein!");
  });

  test('0.705 + 0.365 to be 1.070', () => {
    expect(decSumFeedback(0.705, 0.365, '=1,070')).toBe("Oikein!");
  });

  test('0.705 + 0.365 to be 1.07', () => {
    expect(decSumFeedback(0.705, 0.365, '=1,07')).toBe("Oikein!");
  });

  test('0.705 + 0.365 should not be 1.071', () => {
    expect(decSumFeedback(0.705, 0.365, '=1,071')).toBe(virhe);
  });

});

describe("stringReplace", () => {
  
  test('0,470 should be 0.470', () => {
    expect(stringReplace('0,470',',','.')).toBe('0.470');
  });

  test('0.470 should be 0.470', () => {
    expect(stringReplace('0.470',',','.')).toBe('0.470');
  });

  test('0,47,0 should be 0.47.0', () => {
    expect(stringReplace('0,47,0',',','.')).toBe('0.47.0');
  });
});