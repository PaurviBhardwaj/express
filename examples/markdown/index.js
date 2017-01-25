/**
 * Module dependencies.
 */

let escapeHtml = require('escape-html');
let express = require('../..');
let fs = require('fs');
let marked = require('marked');

let app = module.exports = express();

// register .md as an engine in express view system

app.engine('md', function(path, options, fn) {
  fs.readFile(path, 'utf8', function(err, str) {
    if (err) return fn(err);
    let html = marked.parse(str).replace(/\{([^}]+)\}/g, function(_, name) {
      return escapeHtml(options[name] || '');
    });
    fn(null, html);
  });
});

app.set('views', __dirname + '/views');

// make it the default so we dont need .md
app.set('view engine', 'md');

app.get('/', function(req, res) {
  res.render('index', {title: 'Markdown Example'});
});

app.get('/fail', function(req, res) {
  res.render('missing', {title: 'Markdown Example'});
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
