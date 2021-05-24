const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Team = models.Team;
const Member = models.Member;

class TeamsController extends Controller {
  create(req, res) {
    res.render('teams/create');
  }

  async store(req, res) {
    try{
      const team = await Team.createWithOwner(req.user, req.body);

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