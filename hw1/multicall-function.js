function sum(arg) {
    let sum = arg;
    return function inner(arg) {
        if (arg === 0 || arg) {
            sum+=arg;
            return inner;
        }
        return sum;
    }
};

console.log(sum(0)(1)(2)(3)(4)(5)());