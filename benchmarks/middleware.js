
let http = require('http');
let express = require('..');
let app = express();

// number of middleware

let n = parseInt(process.env.MW || '1', 10);
console.log('  %s middleware', n);

while (n--) {
  app.use(function(req, res, next) {
    next();
  });
}

let body = new Buffer('Hello World');

app.use(function(req, res, next) {
  res.send(body);
});

app.listen(3333);
