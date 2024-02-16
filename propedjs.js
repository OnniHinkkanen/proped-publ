// ------------------ Variables BEGIN -----------------------------------

// const { check } = require("yargs");

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
 *Formats the student's answer *
 * @param {string} vast user input
 * @return {Array[string]} input split into array
 */
function formatFracAns(vast) {
    let tempAns = vast;
    if (tempAns.includes("=")){
        tempAns = tempAns.substring(1);
    }
    if (!tempAns.includes("/")){
        //console.log("Ei murtoluku!")
        return [tempAns, '1'];
    }
    const arr = tempAns.split("/");

    //console.log(arr[0]);
    //console.log(arr[1]);
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

pans = parseFloat(tempAns.replace(',','.'));

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
        //if  (tempAnsArr[0]%oikArr[0] == 0 && tempAnsArr[1]%oikArr[1] == 0 ) {
        //    return "Vastaus ei ole sievimmässä mahdollisessa muodossa.";
        //}
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

function split_to_polynomials(str){

    const better_regex = /\)\(|\)(?=\d|[a-zA-Z])|(?<=\d|[a-zA-Z])\(/

    //matches ')(' and splits the string into array
    const regex = /(?<=\))\(/;

    //Remove all white space chars and asterixes and split with the regex
    let arr = str.replace(/[\s \*]+/g, '').split(better_regex);

    //splits the array further into subarrays for + and -
    for (let i = 0; i < arr.length; i++){

        //delete parentheses
        arr[i] = arr[i].replace(/[\(\)]/g, '')

        //split the strings at + and - such that the sign is still contained in the correct monomial
        let temparr = arr[i].split(/([\+\-]\d*[a-zA-Z]*)/g) //[\+\-]\d*

        //remove empty elements
        arr[i] = temparr.filter(n => n)
    }
    //array of arrays of monomials
    return arr;
}

function sort_by_power(array, vari) {

}

function checkVariable(polyarr){
    let varis = []
    let letterregexp = /[a-z]/gi
    let arr = polyarr[0]
    for (i = 0; i < arr.length; i++) {
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

function arrMembersEqual(arr){
    if (arr.length > 1){
        let a = arr[0]
        for (i = 1; i < arr.length; i++){
            if (arr[i] !== a) return false;
        }
    }
    return true;
}

function removeNonDigitChars(arr){

    return []
}

function interpretPolynomial(polystr){
    let polyarr = split_to_polynomials(polystr)
    if (polyarr.length > 1){
        const e = new Error("Polynomial interpretation is only implemented for a simple polynomial")
            e.name = "NotImplementedError"
            throw e;
    } 
    let vari = checkVariable(polyarr)
    polyarr = sort_by_power(polyarr, vari)
    let coefficients = removeNonDigitChars(polyarr);
    return new Polynomial(vari, coefficients)    
}

/**
 *A class for handling polynomial products ads summation. Currently only works with single-variable polynomials, 
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

    
    equals(a){
        if (this.variable == a.variable && arrayEquals(this.coefficients, a.coefficients)) return true;
        return false;
    }
}

function arrayEquals(a,b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}


// ------------------ Variables END -----------------------------------
// The line above is due to TIM integration; everything below will not get exported to TIM.

//let a = split_to_polynomials('(3*x^2 + 2x - 1)(3x +4)')
//console.log(a[0]+ " " + a[1])

//console.log(split_to_polynomials("(2x-3)(3x-2)"))

let a = new Polynomial('x', [-2,1])
let b = new Polynomial('x', [-2,1])
//console.log("2x^2".search(/\D/gm))
let c = interpretPolynomial("2x^2 -3x + 2")
console.log(a.equals(b))
//console.log(a.plus(b))
//console.log(a.minus(b))

//let polytest = new Polynomial('a', [1,2,3]);
//console.log(polytest.coefficients);

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
    sievennys,
    virhe,
    oikein,
    syoteVirhe,
    Polynomial,
};


//console.log(bintimesbin('(2x - 1)(3x +4)','x'))

//console.log(decFeedback('0.705', '0.365', '=1,070', f = (x,y) => x + y));
//console.log(decFeedback('0.245', '0.483', '0,118335', f= (x,y) => x*y));

// ================================================= OLD JUNK =====================================================