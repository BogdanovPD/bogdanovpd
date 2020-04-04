function sum(arg) {
let sum = arg;
return function inner(arg) {
    if (!arg) {
        return sum;
    }
    sum+=arg;
    return inner;
}
};

console.log(sum(1)(2)(3)(4)(5)());