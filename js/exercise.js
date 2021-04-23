let P = 1, number
number = +prompt("Enter a number?")
if (number < 0) {
    for (let i = -1; i >= number; i--) {
        P *= i;
    }
    console.log(P);
} else {
    for (let i = 1; i <= number; i++) {
        P *= i;
    }
    console.log(P);
}

