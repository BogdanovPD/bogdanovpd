const fs = require('fs');
const { Writable } = require('stream');
sortAndWrite = require('./sortAndWrite');

bytesToWrite = 1024 * 1024 * 100;

new Promise((resolve, reject) => {
    fileCounter = 0;
    out = new Writable({
        write(chunk, encoding, callback) {
            data = chunk.toString().match(/.{1,16}/g)
                .map(Number).sort((a, b) => a - b)
                .map(num => ('0'.repeat(16 - ('' + num).length)) + ('' + num))
                .join('');
            console.log('writing part ' + (fileCounter + 1));
            fs.createWriteStream('bigfile.part' + ++fileCounter).write(data);
            callback();
        }
    });
    out.on('finish', () => {
        return resolve(fileCounter);
    });

    fs.createReadStream('./big.file', { encoding: "utf8", highWaterMark: 1024 * 1024 * 5  }).pipe(out); // (bytesToWrite / highWaterMark's last number) == how many files we need
}).then((fileCounter) => sortAndWrite.sortAndWrite(fileCounter, 1024 * 1024 * 100)); 