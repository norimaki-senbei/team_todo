const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Team = models.Team;
const User = models.User;

class TeamsController extends Controller {
  create(req, res) {
    res.render('teams/create');
  }
  async store(req, res) {
    try{
      //チームをDBに保存
      const team = await Team.create({
        name: req.body.teamName,
        ownerId: req.user.id
      });

      await req.flash('info', '新規チーム' + team.name + 'を作成しました');
      res.redirect(`/manager/teams/${team.id}`);

    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('teams/create', { err: err });
      } else{
        throw err;
      }
    }
  }
}

module.exports = TeamsController;