const http = require('http');

count = process.argv[2];
type = process.argv[3];

if (type === 'async') {
    promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(new Promise((resolve, reject) => {
            http.get('http://localhost:3000', (resp) => {
                console.log(resp.statusCode);
                resolve(resp.statusCode);
            })
        }));
    }
    Promise.all(promises);
} else if (type === 'sync') {
    for (let i = 0; i < count; i++) {
        http.get('http://localhost:3000', (resp) => {
            console.log(resp.statusCode);
        })
    }
}
