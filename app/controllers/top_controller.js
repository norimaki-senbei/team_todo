//const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Team = models.Team;
const User = models.User;

class TopController extends Controller {
  async index(req, res) {
    //if(req.user) {
      const user = await User.findByPk(req.user.id);
      const tasks = await user.getAssignedTask({
        order: [['id', 'ASC']]
      });
      const members = await user.getUserMember({
        include: { model: Team, as: "Team" }
      });
      res.render('index', { title: 'Express', user: req.user, tasks: tasks, members: members });
    //}else {
    //  res.render('index', { title: 'Express', user: req.user });
    //}
  }
}
module.exports = TopController;