//const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Team = models.Team;
const Task = models.Task;
const User = models.User;

class TopController extends Controller {
  async index(req, res) {
    //userがログインしているか分岐
    req.setLocale(req.query.lang || 'ja');
    if(req.user) {
      //?lang=enなら英語、クエリがなければ日本語
      //アサインしているタスクを取得
      const tasks = await Task.findAll({
        where: { assigneeId: req.user.id },
        include: { model: Team, as: "Team" }
      });
      //所属するチームを取得
      const user = await User.findByPk(req.user.id);
      const members = await user.getUserMember({
        include: { model: Team, as: "Team" }
      });
      res.render('index', { title: 'Express', user: req.user, tasks: tasks, members: members });
    }else {
      res.render('index', { title: 'Express', user: req.user });
    }
  }
}
module.exports = TopController;