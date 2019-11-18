const Router = require('express').Router();

Router.get('/', function (req, res, next) {
  res.json({status: 'UP'});
});

module.exports = Router;