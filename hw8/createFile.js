const fs = require('fs');
const file = fs.createWriteStream('./big.file', { highWaterMark: 1024 * 1024 }); //1Mb

createFile(0, 100); // 100mb file

function createFile(counter, size) {
    if (counter == size) {
        return;
    }
    res = true;
    while (res) {
        data = '' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER + 1);
        data = ('0'.repeat(16 - data.length)) + data;
        res = file.write(data);
        if (!res) {
            file.once('drain', async () => {
                counter++;
                console.log('+1mb = ' + counter);
                createFile(counter, size);
            });
        }
    }
}