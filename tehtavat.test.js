const { gcd, murtolukujenSumma, formatoiVastaus, annaTulostus} = require('./tehtavat');


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

describe("annaTulostus", () => {
 
  test('1/2 and 1/2 should be equal', () => {
    expect(annaTulostus(['1','2'],[1,2])).toBe("Oikein!");
  });

  test('2/4 and 1/2 should be simplified', () => {
    expect(annaTulostus(['2','4'],[1,2])).toBe("Vastaus ei ole sievimmässä mahdollisessa muodossa.");
  });

  test('1/2 and 1/3 should not be equal', () => {
    expect(annaTulostus(['1','2'],[1,3])).toBe("Nyt meni jotakin pieleen!");
  });
  
  test('1a/2 and 1/3 should not be equal', () => {
    expect(annaTulostus(['1a','2'],[1,3])).toBe("Syötteesi ei ole numeerisessa muodossa!");
  });

});

describe("formatoiVastaus", () => {
  
  test('=1/2 to [1,2]', () => {
    expect(formatoiVastaus("=1/2")).toStrictEqual(['1','2']);
  });

  test('1/2 to [1,2]', () => {
    expect(formatoiVastaus("1/2")).toStrictEqual(['1','2']);
  });

  test('12 to [12,1]', () => {
    expect(formatoiVastaus("12")).toStrictEqual(['12','1']);
  });

  test('12 to [12,1]', () => {
    expect(formatoiVastaus("=12")).toStrictEqual(['12','1']);
  });

  test('1/1/2 to [12,1]', () => {
    expect(formatoiVastaus("1/1/2")).toStrictEqual(['1','1','2']);
  });

  test('=-1/2 to [1,2]', () => {
    expect(formatoiVastaus("=-1/2")).toStrictEqual(['-1','2']);
  });


});