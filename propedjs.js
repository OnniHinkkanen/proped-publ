// ------------------ Variables BEGIN -----------------------------------
let sievennys = "Vastaus ei ole sievimmässä mahdollisessa muodossa.";
let virhe = "Nyt meni jotakin pieleen!";
let oikein = "Oikein!";
let syoteVirhe = "Syötteesi ei ole numeerisessa muodossa!";

/**
 * Calculates the gcd of two numbers
 * @param {number} a
 * @param {number} b
 * @return {number} 
 */
function gcd(a, b) {
    // Ensure both numbers are positive
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0 && b !== NaN && a !== NaN) {
        let tempAns = b;
        b = a % b;
        a = tempAns;
    }
    return a;
}

/**
 * Calculates the sum of two fractions and returns an array with the corresponding num and denom. If using negative fractions,
 * one should have the numerator be the one with the negative sign.
 * @param {number} a num of 1st frac
 * @param {number} b denom of 1st frac
 * @param {number} c num of 2nd frac
 * @param {number} d denom of 2nd frac
 * @return {Array[number]} [num, denom] of resulting frac
 */
function fracSum(a,b,c,d){
    let osoittaja = a*d + b*c;
    let nimittaja = b*d;
    let jakaja = gcd(osoittaja, nimittaja);
    while (jakaja > 1){
        osoittaja = osoittaja / jakaja;
        nimittaja = nimittaja / jakaja;
        jakaja = gcd(osoittaja, nimittaja)
    }
    return [osoittaja, nimittaja];
}

/**
 * Calculates the product of two fractions and returns an array with the corresponding num and denom
 * @param {number} a num of 1st frac
 * @param {number} b denom of 1st frac
 * @param {number} c num of 2nd frac
 * @param {number} d denom of 2nd frac
 * @return {Array[number]} [num, denom] of resulting frac
 */
function fracProd(a,b,c,d) {
    let osoittaja = a*c;
    let nimittaja = b*d;
    let jakaja = gcd(osoittaja, nimittaja);
    while (jakaja > 1){
        osoittaja = osoittaja / jakaja;
        nimittaja = nimittaja / jakaja;
        jakaja = gcd(osoittaja, nimittaja)
    }
    return [osoittaja, nimittaja];
}

/**
 * Calculates the quotient of two fractions and returns an array with the corresponding num and denom
 * @param {number} a num of 1st frac
 * @param {number} b denom of 1st frac
 * @param {number} c num of 2nd frac
 * @param {number} d denom of 2nd frac
 * @return {Array[number]} [num, denom] of resulting frac
 */
function fracQuot(a,b,c,d) {
    return fracProd(a,b,d,c);
}


/**
 *Formats the student's answer
 * @param {string} vast user input
 * @return {Array[string]} input split into array
 */
function formatFracAns(vast) {
    let tempAns = vast;
    if (tempAns.includes("=")){
        tempAns = tempAns.substring(1);
    }
    if (!tempAns.includes("/")){
        return [tempAns, '1'];
    }
    const arr = tempAns.split("/");

    return arr;
}

/**
 * Returns feedback for decimal sum answer
 *
 * @param {number/string} a 1st decimal number
 * @param {number/string} b 2nd decimal number
 * @param {string} ans user answer
 * @return feedback string
 */
function decSumFeedback(a,b,ans) {
    return decFeedback(a,b,ans, f = (x,y) => x + y);
}

/**
 * Returns feedback for decimal product answer
 *
 * @param {number/string} a 1st decimal number
 * @param {number/string} b 2nd decimal number
 * @param {string} ans user answer
 * @return {string} feedback string
 */
function decProdFeedback(a,b,ans) {
    return decFeedback(a,b,ans, f = (x,y) => x*y);
}

/**
 * Returns feedback for decimal number operation
 *
 * @param {number/string} a 1st decimal number
 * @param {number/string} b 2nd decimal number
 * @param {string} ans user answer
 * @param {function} f operation as a function of two variables
 * @return 
 */
function decFeedback(a, b, ans, f){
    let tempAns = String(ans),
    pa = a,
    pb = b;

    if (typeof a != 'number'){
        pa = parseFloat(a);
    }

    if (typeof b != 'number'){
        pb = parseFloat(b);
    }

    if (tempAns.includes("=")){
        tempAns = tempAns.substring(1);
    }

    let pans = parseFloat(tempAns.replace(',','.'));

    if (isNaN(pans) || isNaN(pa) || isNaN(pb) ){
        return syoteVirhe;
    }

    let result = f(pa, pb);

    if (approxEq(result, pans)) {
        return oikein;
    }

    return virhe;
}


/**
 * Returns the feedback string for the corresponding user input
 *
 * @param {Array[string]} vastArr user's answer as an array
 * @param {Array[number]} oikArr actual answer as an array
 * @return {string} feedback to be printed
 */
function fracFeedback(vastArr, oikArr){
    let tempAnsArr = [parseInt(vastArr[0]), parseInt(vastArr[1])]
    

    if (isNaN(tempAnsArr[0]) || isNaN(tempAnsArr[1])){
        return syoteVirhe;
    }

    let gcdAns = gcd(tempAnsArr[0], tempAnsArr[1]);
    
    if (tempAnsArr[0] == oikArr[0] && tempAnsArr[1] == oikArr[1]){
        return oikein;
    } else if (gcdAns > 1 ) {
        if (oikArr[1] == 1 && tempAnsArr[1]/gcdAns != 1) {
            return virhe;
        }

        if  (tempAnsArr[0]/ gcdAns == oikArr[0] && tempAnsArr[1]/gcdAns == oikArr[1] ) {
            return sievennys;
        }  
    } 
    return virhe;
}

/**
 * Rounds decimal numbers 
 *
 * @param {number} num Number to be rounded
 * @param {number} decimals amount of decimals 
 * @return {number} rounded number
 */
function round(num, decimals) {
    return num.toFixed(decimals);
}

/**
 * 
 *
 * @param {*} num 
 * @param {*} decimals 
 * @return 
 */
function truncate(num, decimals) {
    return Math.floor(num*10**decimals)/(10**decimals);
}

/**
 * 
 *
 * @param {number} v1 
 * @param {number} v2 
 * @param {number} epsilon 
 * @return 
 */
function approxEq(v1, v2, epsilon = 0.0001) {
    return Math.abs(v1 - v2) < epsilon;
  };

/**
 * Replaces all the ocurrences of oldChar with newChar
 *
 * @param {string} string 
 * @param {string} oldChar 
 * @param {string} newChar 
 * @returns {string} the new string
 */
function stringReplace(string, oldChar, newChar){
    if (!string.includes(oldChar)) {
        return string;
    }
    let newString = "";
    for (let i = 0; i < string.length; i++){
        char = string.charAt(i)
        if (char != oldChar){
            newString = newString + char;
        } else {
            newString = newString + newChar;
        }
    }
    return newString;
}

/**
 * Evaluates if the user answer is correct for product of two similar powers
 *
 * @param {number} a 1st exponend
 * @param {number} b 2nd exponent
 * @param {string} vari variable
 * @param {string} ans what the user answered
 * @return {string} feedback for the student answer
 */
function prodofpowers(a, b, vari, ans){
    return power(a,b,vari, ans, f =(x,y) => x+y)
}

/**
 * Evaluates if the user answer is correct for power of power
 *
 * @param {number} a 1st exponend
 * @param {number} b 2nd exponent
 * @param {string} vari variable
 * @param {string} ans what the user answered
 * @return {string} feedback for the student answer 
 */
function powerofpower(a, b, vari, ans){
    return power(a,b,vari, ans, f =(x,y) => x*y)
}



/**
 *A function for evaluating the responses of students for exponentiation rules. 
 *
 * @param {number} a 1st exponent
 * @param {number} b 2nd exponent
 * @param {string} vari variable; base number
 * @param {string} ans what the student answered
 * @param {function} f function to evaluate the exponent; e.g. a^5*a^3 would need f= (x,y) => x + y; to obtain the correct answer a^8.
 * @return {string} feedback for the student answer 
 */
function power(a,b,vari,ans, f){
    let tempAns = ans.replace('=', '').replace('(','').replace(')','');
    if (!tempAns.includes(vari)){
        if (f(a,b) == 0 && parseInt(tempAns) == 1){
            return oikein;
        }
        return virhe;
    }
    let arr = tempAns.split('^');
    if (parseInt(arr[1]) == f(a,b)){
        return oikein;
    }
    return virhe;
}

/**
 * Evaluates if the user answer is correct for quotinent of two similar powers
 *
 * @param {number} a 1st exponend
 * @param {number} b 2nd exponent
 * @param {string} vari variable
 * @param {string} ans what the user answered
 */
function quotofpowers(a, b, vari, ans){
    return power(a,b,vari, ans, f =(x,y) => x - y)
}

/**
 * Checks if an array contains duplicates.
 *
 * @param {array} array
 * @return {boolean} 
 */
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

/**
 * Checks if all the members of an array are equal.
 *
 * @param {Array} arr array
 * @return {boolean} 
 */
function arrMembersEqual(arr){
    if (arr.length > 1){
        let a = arr[0]
        for (i = 1; i < arr.length; i++){
            if (arr[i] !== a) return false;
        }
    }
    return true;
}


/**
 * Array equality method, non-deep
 *
 * @param {Array} a 1st array
 * @param {Array} b 2nd array
 * @return {boolean} 
 */
function arrayEquals(a,b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

/**
 *A class for handling polynomial products and summation. Currently only works with single-variable polynomials, 
 *but extending this to multi-variable polynomials should not be hard at all.
 *
 * @class Polynomial
 */
class Polynomial{
    constructor(variable, coefficients){
        this.variable = variable;
        this.coefficients = coefficients;
    }

    

    /**
     * Let 
     * p(x) = p_n x^n + ... + p_1 x + p_0 and
     * q(x) = q_m x^m + ... + q_1 x + q_0.
     * 
     * Now
     * p(x)q(x) = \sum_{k=0}^{n+m} \sum_{l = 0}^k p_l q_{k-l} x^k
     *          = \sum_{k=0}^{n+m} x^k \sum_{l = 0}^k p_l q_{k-l}.
     *
     * Hence we need to calculate 
     * 
     * \sum_{l = 0}^k p_l q_{k-l}
     * 
     * for k \in \{0, 1, ... , n + m\} to attain the product coefficients.
     * 
     * This only works, if the polynomials are of the same variable. If we have 
     * 
     * p(x) = p_0 + p_1 x + ... + p_n x^n and
     * q(y) = q_0 + q_1 x + ... + q_m y^m
     * 
     * and want to calculate p(x)q(y), the coefficients would form the n x m matrix
     * 
     * p_0q_0   p_0q_1  ... p_0q_m
     * p_1q_0   p_1q_1         :
     *   :              ...    .
     * p_nq_m   ...         p_nq_m
     * 
     * where the indices denote the power of the corresponding variable x and y, respectively.
     * 
     * This is yet to be implemented
     * 
     * @param {Polynomial} a the other polynomial to be multiplied
     * @returns {Polynomial} the polynomial product as a member of Polynomial
     * @memberof Polynomial
     */
    times(a){
        if (this.variable == a.variable){
            let p = this.coefficients;
            let q = a.coefficients;
            let n = this.coefficients.length - 1;
            let m = a.coefficients.length - 1;
            let product = [];
            
            // Construct the sums
            for (let k = 0; k <= n + m; k++){
                let sum = 0;
                for (let l = 0; l <= k; l++){
    
                    // Check that the indexes are in range
                    if (l <= n && k - l <= m){
                        sum += p[l]*q[k - l]
                    }
                }
                product.push(sum);
            }
    
            return new Polynomial(this.variable, product);
        }
        else {
            const e = new Error("Multi-variable product is yet to be implemented")
            e.name = "NotImplementedError"
            throw e;
        }
    }


    /**
     * Addition for polynomials. Currently only works for polynomials of the same variable.
     *
     * @param {Polynomial} a the other polynomial
     * @return {Polynomial} Resulting polynomial of the summation 
     * @memberof Polynomial
     */
    plus(a){
        if (this.variable == a.variable){
            let lb = Math.min(this.coefficients.length, a.coefficients.length);
            let sum = []
            for(let i = 0; i < lb; i++){
                sum.push(this.coefficients[i] + a.coefficients[i])
            }

            if (this.coefficients.length > lb){
                for (let i = lb; i < this.coefficients.length; i++){
                    sum.push(this.coefficients[i])
                }
                return sum;
            }else {
                for (let i = lb; i < a.coefficients.length; i++){
                    sum.push(a.coefficients[i])
                }
                return new Polynomial(this.variable, sum);
            }
        } else {
            const e = new Error("Multi-variable product is yet to be implemented")
            e.name = "NotImplementedError"
            throw e;
        }
    }   


    /**
     *Polynomial substraction acquired by summation; p(x) + (-q(x)). 
     * Currently only works for polynomials of the same variable.
     *
     * @param {Polynomial} a polynomial to be substracted i.e. q(x)
     * @return {Polynomial} The resulting polynomial 
     * @memberof Polynomial
     */
    minus(a){
        return this.plus(new Polynomial(a.variable, a.coefficients.map((e) => -1*e)));
    }
    
    
    /**
     * Checks the equality of two polynomials.
     *
     * @param {Polynomial} a the other polynomial
     * @return {boolean} equality
     * @memberof Polynomial
     */
    equals(a){
        if (this.variable == a.variable && arrayEquals(this.coefficients, a.coefficients)) return true;
        return false;
    }

    /**
     * Splits a polynomial product expression into it's factors, i.e. (2x -3)(-4 -12x^2) will return [[2x, -3],[-4, -12x^2]]
     *
     * @param {string} str polynomial product as a string
     * @return {Array[Array[string]]} 2D array of the monomials contained in the product 
     * @memberof Polynomial
     */
    split_to_polynomials(str){

        const better_regex = /\)\(|\)(?=\d|[a-zA-Z]|-|\+)|(?<=\d|[a-zA-Z])\(/

        //matches ')(' and splits the string into array
        // const regex = /(?<=\))\(/;

        //Remove all white space chars, asterixes and equal signs and split with the above regex
        let newstring =str.replace(/[\s \*=]+/g, '') 
        let arr = newstring.split(better_regex);

        //splits the array further into subarrays for + and -
        for (let i = 0; i < arr.length; i++){

            //delete parentheses
            arr[i] = arr[i].replace(/[\(\)]/g, '')

            //split the strings at + and - such that the sign is still contained in the correct monomial
            let temparr = arr[i].split(/([\+\-]?\d*[a-zA-Z]*\^?\d*)/gi) //[\+\-]\d*
            // /([\+\-]\d*[a-zA-Z]*)/g

            //remove empty elements
            arr[i] = temparr.filter(n => n)
        }
        //array of arrays of monomials
        return arr;
    }


    /**
     * Checks that a polynomial only has one variable.
     *
     * @param {Array[string]} polyarr array of monomials
     * @return {char} the variable
     * @memberof Polynomial
     */
    checkVariable(polyarr){
        let varis = []
        let letterregexp = /[a-z]/gi
        let arr = polyarr
        for (let i = 0; i < arr.length; i++) {
            let index = arr[i].search(letterregexp)
            varis.push(arr[i].substring(index, index + 1))
        }
        //remove empty cells
        varis = varis.filter(n => n)
        if (arrMembersEqual(varis)){
            return varis[0]
        }    
        else {
            const e = new Error("Multi-variable polymomials are not implemented yet")
            e.name = "NotImplementedError"
            throw e;
        }
    }


    /**
     * Get the coefficients of an array of monomials
     *
     * @param {Array[string]} arr array of monomials
     * @return {Array[number]} array of coefficients 
     * @memberof Polynomial
     */
    getCoefficients(arr){
        let coeff = []
        for (let i = 0; i < arr.length; i++){
            if (arr[i] === 0){
                coeff.push(0)
                continue
            }
            let index = arr[i].search(/[a-z]/gi)
            if (index == 0 && arr[i].length === 1){
                coeff.push(1)
                continue
            }
            coeff.push((index !== -1) ? parseInt(arr[i].substring(0, index )) : parseInt(arr[i]))
        }
        return coeff
    }


    /**
     * Sorts an array of monomials by power.
     *
     * @param {Array[string]} arr array of monomials
     * @param {char} vari variable
     * @return {Array[string]} sorted array of monomials (with '0' cells if need)
     * @memberof Polynomial
     */
    sort_by_power(arr, vari) {
        let array = arr
        let powers = []
        for (let i = 0; i < array.length; i++){
            if (!array[i].includes(vari)){
                powers.push(0)
                continue
            } else if (array[i].includes(vari) && !array[i].includes('^')){
                powers.push(1)
            } else {
                let temparr = array[i].split('^')
                powers.push(parseInt(temparr[temparr.length -1]))
            }
        }
        if (hasDuplicates(powers)){
            const e = new Error("The user-given polynomial may be simplified further")
            e.name = "UserInputError"
            throw e;
        }

        let max = Math.max.apply(null, powers)
        let sorted = []
        for (let i = 0; i <= max; i++){
            for (let j = 0; j < powers.length; j++){
                if (powers[j] === i) {
                    sorted.push(array[j])
                    break
                }

                if (j === powers.length -1) {
                    sorted.push(0)
                }
            }
        }
        return sorted
    }





    /**
     *  Parses student answer into a polynomial
     *
     * @param {string} polystr string to be parsed
     * @return {Polynomial} resulting polynomial
     * @memberof Polynomial 
     */
    interpretPolynomial(polystr){
        let polyarr = this.split_to_polynomials(polystr)
        if (polyarr.length > 1 ){
            const e = new Error("Polynomial interpretation is only implemented for a simple polynomial")
                e.name = "NotImplementedError"
                throw e;
        } 

        if (polyarr[0].length === 0 ){
            const e = new Error("The input string does not contain a polynomial")
                e.name = "UserInputError"
                throw e;
        } 

        polyarr = polyarr[0]
        let vari = this.checkVariable(polyarr)
        polyarr = this.sort_by_power(polyarr, vari)
        let coefficients = this.getCoefficients(polyarr);
        return new Polynomial(vari, coefficients)    
    }
    
}


/**
 *Gives feedback about student's polynomial product answer.
 *
 * @param {char} var1 Variable of the 1st polynomial
 * @param {number} arr1 Coefficients [x_0, x_1, ...] of the 1st polynomial
 * @param {char} var2 variable of the 2nd polynomial
 * @param {number} arr2 coefficients of the 2nd polynomial
 * @param {string} input student answer
 * @return {string} feedback
 */
function fbPolyProd(var1, arr1, var2, arr2, input){
    let a = new Polynomial(var1, arr1.map((e) => parseInt(e)))
    let b = new Polynomial(var2, arr2.map((e) => parseInt(e)))
    let ab = a.times(b)
    let c = new Polynomial().interpretPolynomial((input.substring(0,1) === '=') ? input.substring(1) : input)

    if (c.equals(ab)){
        return oikein
    }

    return virhe
}

/**
 *Gives feedback about student's polynomial sum answer.
 *
 * @param {char} var1 Variable of the 1st polynomial
 * @param {number} arr1 Coefficients [x_0, x_1, ...] of the 1st polynomial
 * @param {char} var2 variable of the 2nd polynomial
 * @param {number} arr2 coefficients of the 2nd polynomial
 * @param {string} input student answer
 * @return {string} feedback
 */
 function fbPolySum(var1, arr1, var2, arr2, input){
    let a = new Polynomial(var1, arr1.map((e) => parseInt(e)))
    let b = new Polynomial(var2, arr2.map((e) => parseInt(e)))
    let ab = a.plus(b)
    let c = new Polynomial().interpretPolynomial((input.substring(0,1) === '=') ? input.substring(1) : input)

    if (c.equals(ab)){
        return oikein
    }

    return virhe
}


/**
 *Gives feedback about student's polynomial sum answer.
 *
 * @param {char} var1 Variable of the 1st polynomial
 * @param {number} arr1 Coefficients [x_0, x_1, ...] of the 1st polynomial
 * @param {char} var2 variable of the 2nd polynomial
 * @param {number} arr2 coefficients of the 2nd polynomial
 * @param {string} input student answer
 * @return {string} feedback
 */
 function fbPolyMinus(var1, arr1, var2, arr2, input){
    let a = new Polynomial(var1, arr1.map((e) => -1*parseInt(e)))
    let b = new Polynomial(var2, arr2.map((e) => -1*parseInt(e)))
    let ab = a.minus(b)
    let c = new Polynomial().interpretPolynomial((input.substring(0,1) === '=') ? input.substring(1) : input)

    if (c.equals(ab)){
        return oikein
    }

    return virhe
}

function parseAndCalcPolyProd(prod) {
    let arr = new Polynomial().split_to_polynomials(prod)
    if (arr.length > 2){
        const e = new Error("No support for parsing and calculating a product of more than two polynomials.")
                e.name = "NotImplementedError"
                throw e;
    }

    let a = new Polynomial().interpretPolynomial(arr[0])
    let b = new Polynomial().interpretPolynomial(arr[1])
}


// ------------------ Variables END -----------------------------------
// The line above is due to TIM integration; everything below will not get exported to TIM.


let a = new Polynomial('x', [-2,3])
let b = new Polynomial('x', [2,1])

let c = a.times(b)



console.log(fbPolySum('x', ['-2','3'], 'x', ['2','1'], "=4x"))
//let c = interpretPolynomial("x -2 +3x^2")
let d = new Polynomial().interpretPolynomial("x");
let e = new Polynomial().split_to_polynomials("(x^2 - 3x)-2x")
console.log(d + d.coefficients)


module.exports = {
    gcd,
    fracSum,
    fracProd,
    fracQuot,
    formatFracAns,
    fracFeedback,
    round,
    truncate,
    decSumFeedback,
    decProdFeedback,
    stringReplace,
    power,
    prodofpowers,
    quotofpowers,
    powerofpower,
    fbPolyProd,
    sievennys,
    virhe,
    oikein,
    syoteVirhe,
    Polynomial,
};

// ================================================= OLD JUNK =====================================================