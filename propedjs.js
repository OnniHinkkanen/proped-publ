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
 * @return feedback string
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
 */
function stringReplace(string, oldChar, newChar){
    if (!string.includes(oldChar)) {
        return string;
    }
    newString = "";
    for (i = 0; i < string.length; i++){
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
 */
function powerofpower(a, b, vari, ans){
    return power(a,b,vari, ans, f =(x,y) => x*y)
}



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

function bintimesbin(str, vari){
    
    // split into binomials
    let binarray = str.split(')(');

    // REMOVE THE brackets
    for (i = 0; i < binarray.length; i++){
        binarray[i] = binarray[i].replace('(','').replace(')','');
    }
    let binone = [], bintwo = [];

    // Separate the two monomials
    binone = (binarray[0].includes('+')) ? binarray[0].split('+') : [binarray[0].substring(0, binarray[0].indexOf('-')),binarray[0].slice(binarray[0].indexOf('-'))];
    bintwo = (binarray[1].includes('+')) ? binarray[1].split('+') : [binarray[1].substring(0, binarray[1].indexOf('-')),binarray[1].slice(binarray[1].indexOf('-'))];
    
    let a=0, b=0,c=0,d=0;
    for(i = 0; i < binone.length; i++){
        if(binone[i].includes(vari)){
            a = binone[i].substring(0,binone[i].indexOf(vari));
        } else {
            b =binone[i];
        }
        if(bintwo[i].includes(vari)){
            c = bintwo[i].substring(0,bintwo[i].indexOf(vari));
        } else {
            d = bintwo[i];
        }


    }

    console.log('a: '+ a + " b: " + b +" c: "+ c + " d: " + d)

}

function split_into_arrays(str){
    //matches ')(' and splits the string into array
    const regex = /(?<=\))\(/;
    let arr = str.split(regex);

    //splits the array further into subarrays for + and -
    for (i = 0; i < arr.length; i++){
        arr[i] = arr[i].replace(/[\(\)]/g, '')
        let temparr = arr[i].split(/([\+\-]\d*)/g)
        arr[i] = temparr.filter(n => n)
    }
    //array of arrays of monomials
    return arr;
}

function binprod(arr){

}

function monotimes(a,b) {

}

// class poly{
//
//private string variable;
//private List<Int> coefficients;
//
//public static poly times(poly a){};
//oublic static poly plusminus(poly a){};
//
//}

class Polynomial{
    constructor(variable, coefficients){
        this.variable = variable;
        this.coefficients = coefficients;
    }
}


// ------------------ Variables END -----------------------------------

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
    bintimesbin,
    sievennys,
    virhe,
    oikein,
    syoteVirhe
};
let polynomial = '(3x-2)(x+1)';
let arr = split_into_arrays(polynomial);
console.log(arr[0] + " " + arr[1] + " " + arr[2])

//console.log(bintimesbin('(2x - 1)(3x +4)','x'))

//console.log(decFeedback('0.705', '0.365', '=1,070', f = (x,y) => x + y));
//console.log(decFeedback('0.245', '0.483', '0,118335', f= (x,y) => x*y));

// ================================================= OLD JUNK =====================================================