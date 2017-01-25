/**
 * Module dependencies.
 */

let db = require('../../db');

exports.name = 'pet';
exports.prefix = '/user/:user_id';

exports.create = function(req, res, next) {
  let id = req.params.user_id;
  let user = db.users[id];
  let body = req.body;
  if (!user) return next('route');
  let pet = {name: body.pet.name};
  pet.id = db.pets.push(pet) - 1;
  user.pets.push(pet);
  res.message('Added pet ' + body.pet.name);
  res.redirect('/user/' + id);
};
