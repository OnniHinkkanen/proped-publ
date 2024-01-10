// ------------------ Variables BEGIN -----------------------------------
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
        let temp = b;
        b = a % b;
        a = temp;
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
function formatAns(vast) {
    let temp = vast;
    if (temp.includes("=")){
        temp = temp.substring(1);
    }
    if (!temp.includes("/")){
        //console.log("Ei murtoluku!")
        return [temp, '1'];
    }
    const arr = temp.split("/");

    //console.log(arr[0]);
    //console.log(arr[1]);
    return arr;
}

/**
 * Returns the feedback string for the corresponding user input
 *
 * @param {Array[string]} vastArr user's answer as an array
 * @param {Array[number]} oikArr actual answer as an array
 * @return {string} feedback to be printed
 */
function getFeedbackFrac(vastArr, oikArr){
    let tempArr = [parseInt(vastArr[0]), parseInt(vastArr[1])]
    
    if (isNaN(tempArr[0]) || isNaN(tempArr[1])){
        return "Syötteesi ei ole numeerisessa muodossa!";
    }

    if (tempArr[0] == oikArr[0] && tempArr[1] == oikArr[1]){
        return "Oikein!";
    } else if (gcd(tempArr[0], tempArr[1]) > 1 ) {
        if (tempArr[1] == 1) {
            return "Nyt meni jotakin pieleen!";
        }
        if  (tempArr[0]%oikArr[0] == 0 && tempArr[1]%oikArr[1] == 0 && oikArr[1] != 1) {
            return "Vastaus ei ole sievimmässä mahdollisessa muodossa.";
        } 
    } 
    return "Nyt meni jotakin pieleen!";
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

function truncate(num, decimals) {
    return Math.floor(num*10**decimals)/(10**decimals);
}

function decSum(a,b,ans){

}

function decProd(a,b,ans){
    
}

// ------------------ Variables END -----------------------------------

module.exports = {
    gcd,
    fracSum,
    fracProd,
    fracQuot,
    formatAns,
    getFeedbackFrac,
    round,
    truncate,
    decSum,
    decProd
};


console.log(getFeedbackFrac(['50','10'], [5,1]));
console.log(round(0.00029, 4))
console.log(truncate(1.123456, 100))