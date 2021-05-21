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
      //チームをDBに保存
      const team = await Team.create({
        name: req.body.teamName,
        ownerId: req.user.id
      });

      //チーム作成者をmanagerとしてMember登録する
      await Member.create({
        teamId: team.id,
        userId: req.user.id,
        role: 1
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