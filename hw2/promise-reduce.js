var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

async function promiseReduce(asyncFunctions, reduce, initialValue) {
    for (fun of asyncFunctions) {
        await fun().then(val => initialValue = reduce(initialValue, val))
    }
    return Promise.resolve(initialValue)
}

promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce')
        return memo * value
    },
    1
)
    .then(console.log)