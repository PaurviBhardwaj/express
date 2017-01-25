
let express = require('../'),
   request = require('supertest');

describe('app.del()', function() {
  it('should alias app.delete()', function(done) {
    let app = express();

    app.del('/tobi', function(req, res) {
      res.end('deleted tobi!');
    });

    request(app)
    .del('/tobi')
    .expect('deleted tobi!', done);
  });
});
