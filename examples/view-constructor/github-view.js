/**
 * Module dependencies.
 */

let http = require('http');
let path = require('path');
let extname = path.extname;

/**
 * Expose `GithubView`.
 */

module.exports = GithubView;

/**
 * Custom view that fetches and renders
 * remove github templates. You could
 * render templates from a database etc.
 */

function GithubView(name, options) {
  this.name = name;
  options = options || {};
  this.engine = options.engines[extname(name)];
  // "root" is the app.set('views') setting, however
  // in your own implementation you could ignore this
  this.path = '/' + options.root + '/master/' + name;
}

/**
 * Render the view.
 */

GithubView.prototype.render = function(options, fn) {
  let self = this;
  let opts = {
    host: 'raw.githubusercontent.com',
    port: 443,
    path: this.path,
    method: 'GET',
  };

  https.request(opts, function(res) {
    let buf = '';
    res.setEncoding('utf8');
    res.on('data', function(str) {
 buf += str; 
});
    res.on('end', function() {
      self.engine(buf, options, fn);
    });
  }).end();
};
