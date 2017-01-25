/**
 * Module dependencies.
 */

let express = require('../..');
let logger = require('morgan');
let app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

let pets = [];

let n = 1000;
while (n--) {
  pets.push({name: 'Tobi', age: 2, species: 'ferret'});
  pets.push({name: 'Loki', age: 1, species: 'ferret'});
  pets.push({name: 'Jane', age: 6, species: 'ferret'});
}

app.use(logger('dev'));

app.get('/', function(req, res) {
  res.render('pets', {pets: pets});
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
