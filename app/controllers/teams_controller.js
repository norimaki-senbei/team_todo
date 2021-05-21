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
      res.redirect(`/teams/${team.id}`);

    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('teams/create', { err: err });
      } else{
        throw err;
      }
    }
  }

  async show(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    //teamIdに結びついたタスクを全て抜き出す
    const tasks = await team.getTeamTask({
      include: { model: User, as: 'Assignee'},
      order: [['id', 'ASC']]
    });
    res.render('teams/show', { team: team, tasks: tasks } );
  }

  async edit(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    res.render('teams/edit', { team });
  }

  async update(req, res) {
    try{
      const teamId = req.params.team;
      const teamName = req.body.teamName;
      const team = await Team.findByPk(teamId);
      await team.update(
        { name: teamName },
        { where: { id: teamId } }
      );
      await req.flash('info', 'チーム名を' + team.name + 'に変更しました');
      res.redirect(`/teams/${teamId}`);
    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('teams/edit', { err: err });
      } else{
        throw err;
      }
    }
  }
}

module.exports = TeamsController;