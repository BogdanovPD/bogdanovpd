const { Writable } = require('stream');
const fs = require('fs');

module.exports = {
    sortAndWrite: function (fileCounter, bytesToWrite) {
        console.log('sorting');
        sorted = fs.createWriteStream('./big_sorted.file');
    
        readables = [];
        max = 0;
    
        readOut = new MultipleReadWritable();
        readOut.setMaxListeners(fileCounter);
    
        for (i = 1; i <= fileCounter; i++) {
            newReadable = createNewReadable(i);
            newReadable.pipe(readOut, { end: false });
            readables.push(newReadable);
        }
    }
  };

class MultipleReadWritable extends Writable {

    temp = [];

    constructor(options) {
        super(options);
    }

    _write(chunk, encoding, callback) {
        this.temp.push(new Number(chunk.toString()));
        if (this.temp.length === readables.length) {
            this.process();
            readables.forEach(readable => readable.resume());
        }
        callback();
    }

    process() {
        let greaterMaxArray = this.temp.filter(num => num >= max);
        let min = Math.min.apply(Math, greaterMaxArray); //I could consider a case where each column contains the same min, but i'm too lazy :)
        let minArray = this.temp.filter(num => num == min);
        minArray.forEach(num => sorted.write(num + ' '));
        this.temp = [];
        bytesToWrite -= 16 * minArray.length;
        // console.log(1024 * 1024 * 100 - bytesToWrite + '/' + 1024 * 1024 * 100);
    }
}

function createNewReadable(i) {
    const fileName = './bigfile.part' + i;
    newReadable = fs.createReadStream(fileName, { encoding: "utf8", highWaterMark: 16 });
    newReadable.on('data', () => {
        newReadable.pause();
    });
    newReadable.on('end', () => {
        endCounter = 0;
        if (readables.length === fileCounter) {
            readOut.removeAllListeners();
        }
        if (bytesToWrite > 0) {
            console.log('stream recreation for' + fileName + ' bytes left: ' + bytesToWrite);
            newReadable = createNewReadable(i);
            readables.splice(i - 1, 1, newReadable);
            newReadable.pipe(readOut, { end: false });
            readables.push(newReadable);
        } else {
            console.log('completed')
            readOut.destroy();
        }
    });
    return newReadable;
}