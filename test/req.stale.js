
let express = require('../'),
   request = require('supertest');

describe('req', function() {
  describe('.stale', function() {
    it('should return false when the resource is not modified', function(done) {
      let app = express();
      let etag = '"12345"';

      app.use(function(req, res) {
        res.set('ETag', etag);
        res.send(req.stale);
      });

      request(app)
      .get('/')
      .set('If-None-Match', etag)
      .expect(304, done);
    });

    it('should return true when the resource is modified', function(done) {
      let app = express();

      app.use(function(req, res) {
        res.set('ETag', '"123"');
        res.send(req.stale);
      });

      request(app)
      .get('/')
      .set('If-None-Match', '"12345"')
      .expect(200, 'true', done);
    });

    it('should return true without response headers', function(done) {
      let app = express();

      app.use(function(req, res) {
        res._headers = null;
        res.send(req.stale);
      });

      request(app)
      .get('/')
      .expect(200, 'true', done);
    });
  });
});
