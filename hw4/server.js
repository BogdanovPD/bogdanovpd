const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
let reqCounter = 0;
let resCounter = 0;
let respFunctions = [];

const server = http.createServer((req, res) => {
  console.log(`Request ${++reqCounter} received`);

  respFunctions.push(() => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log(`Response ${++resCounter} sent`);
    res.end(`Response ${resCounter}`);
  }
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  setInterval(sendRequests, 100);
});

function sendRequests() {
  tempResp = respFunctions.slice();
  tempResp.forEach(respFn => respFn());
  respFunctions = respFunctions.filter((el) => !tempResp.includes(el));
}