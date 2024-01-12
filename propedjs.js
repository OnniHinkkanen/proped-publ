// ------------------ Variables BEGIN -----------------------------------

let sievennys = "Vastaus ei ole sievimmässä mahdollisessa muodossa.";
let virhe = "Nyt meni jotakin pieleen!";
let oikein = "Oikein!";
let syoteVast = "Syötteesi ei ole numeerisessa muodossa!";

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

    while (b !== 0 && b !== NaN) {
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
 * 
 *
 * @param {number} a 1st dec number
 * @param {number} b 2nd dec number
 * @param {string} ans what the user entered
 */
function decSumFeedback(a,b,ans){
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
        return syoteVast;
    }
    
    let sum = pa + pb;
        // TODO: approximately equal, since dealing with floats. Truncating does not work    

    if (approxEq(sum, pans)) {
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
        return syoteVast;
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
 * 
 *
 * @param {*} a 
 * @param {*} b 
 * @param {*} ans 
 */
function decProd(a,b,ans){
    
}


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

// ------------------ Variables END -----------------------------------

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
    decProd,
    stringReplace,
    sievennys,
    virhe,
    oikein,
    syoteVast
};

console.log(decSumFeedback('0.705', '0.365', '=1,070'))