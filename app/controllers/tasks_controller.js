const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Task = models.Task;

class TeamsController extends Controller {
  create(req, res) {
    const teamId = req.params.team;
    res.render('tasks/create', { teamId } );
  }

  async store(req, res) {
    try{
      //チームをDBに保存
      const task = await Task.create({
        teamId: req.params.team,
        title: req.body.taskTitle,
        body: req.body.taskBody,
        status: 0
      });
      
      await req.flash('info', '新規の予定' + task.title + 'を作成しました');
      res.redirect(`/teams/${task.teamId}`);

    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('tasks/create', { err: err });
      } else{
        throw err;
      }
    }
  }

  async edit(req, res) {
    const taskId = req.params.task;
    const teamId = req.params.team;
    const task = await Task.findByPk(taskId);
    res.render('tasks/edit', { task, teamId });
  }

  async show(req, res) {
    const teamId = req.params.team;
    await Team.findByPk(teamId).then((team) => {
      res.render('teams/show', {team});
    });
  }



  async update(req, res) {
    try{
      const teamId = req.params.team;
      const taskId = req.params.task;
      const task = await Task.findByPk(taskId); 
      await task.update(
        {
          title: req.body.taskTitle,
          body: req.body.taskBody,
          status: 0
        },
        {where: { id: teamId } }
        );
      
      await req.flash('info', '予定' + task.title + 'を変更しました');
      res.redirect(`/teams/${teamId}`);
    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('tasks/edit', { err: err });
      } else{
        throw err;
      }
    }
  }

}

module.exports = TeamsController;