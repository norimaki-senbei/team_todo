const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class IndexController extends Controller {
  show(req, res) {
    //const user = req.user;
    res.render('index');
  }

}

module.exports = IndexController;