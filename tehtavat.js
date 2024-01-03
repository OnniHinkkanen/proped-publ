function gcd(a, b) {
    // Ensure both numbers are positive
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function murtolukujenSumma(a,b,c,d){
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

function formatoi_vastaus(vast) {
    let temp = vast;
    if (temp.includes("=")){
        temp = temp.substring(1);
    }
    if (!temp.includes("/")){
        console.log("Ei murtoluku!")
        return;
    }
    const arr = temp.split("/");

    console.log(arr[0]);
    console.log(arr[1]);
    return arr;
}

let vastArr = formatoi_vastaus("=-32/17");
let oikArr = murtolukujenSumma(1,2,3,2);
console.log(vastArr[0])
console.log(vastArr[1])