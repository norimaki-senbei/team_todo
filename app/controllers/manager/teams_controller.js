const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');
const Team = models.Team;
const User = models.User;

class TeamsController extends Controller {

  async show(req, res) {
    console.log();
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    //teamIdに結びついたタスクを全て抜き出す
    const tasks = await team.getTeamTask({
      include: { model: User, as: 'Assignee' },
      order: [['id', 'ASC']]
    });
    res.render('manager/teams/show', { team: team, tasks: tasks } );
  }

  async edit(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    res.render('manager/teams/edit', { team });
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
      res.redirect(`/manager/teams/${teamId}`);
    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('manager/teams/edit', { err: err });
      } else{
        throw err;
      }
    }
  }
}

module.exports = TeamsController;