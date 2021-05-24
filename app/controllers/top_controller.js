const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Team = models.Team;
const User = models.User;

class TopController extends Controller {
  async index(req, res) {
    if(req.user) {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      const tasks = await user.getAssignedTask({
        order: [['id', 'ASC']]
      });
      const members = await user.getUserMember({
        include: { model: Team, as: "Team" }
      });
      res.render('index', { title: 'Express', user: req.user, tasks: tasks, members: members });
    }else {
      res.render('index', { title: 'Express', user: req.user });
    }
  }

  //ここ以降使わないから後で削除
  async create(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    const members = await team.getTeamMember({
      include: { model: User, as: "User" },
      order: [['id', 'ASC']]
    });
    res.render('manager/tasks/create', { teamId: teamId, members: members } );
  }

}

module.exports = TopController;