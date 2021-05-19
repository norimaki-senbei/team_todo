const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Task = models.Task;
const Team = models.Team;

class TeamsController extends Controller {
  
  async index(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    //teamIdに結びついたタスクを全て抜き出す
    const members = await team.getTeamMember({
      order: [['id', 'ASC']]
    });
    res.render('members/index', { team: team, members: members } );
  }




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
    //予定の編集はこれでOK？タスクIdとチームIdの両方から引っ張ったほうがいい気がする。そうしないと適当にURLうったら違うチームでも変更できちゃう。
    //要確認
    const team = await Team.findByPk(teamId); 
    const tasks = await team.getTeamTask({
      where: { id: taskId }
    }); 
    const task = tasks[0];
    //ToDo仮にteamIdとtaskIdが一致する物がなかった場合の処理の追加
    res.render('tasks/edit', { task: task, teamId: teamId });
  }


  async update(req, res) {
    try{
      const teamId = req.params.team;
      const taskId = req.params.task;
      //予定の編集はこれでOK？タスクIdとチームIdの両方から引っ張ったほうがいい気がする。そうしないと適当にURLうったら違うチームでも変更される。
      //要確認 
      const team = await Team.findByPk(teamId); 
      const tasks = await team.getTeamTask({
        where: { id: taskId }
      }); 
      const task = tasks[0];
      //ToDo仮にteamIdとtaskIdが一致する物がなかった場合の処理の追加

      await task.update(
        {
          title: req.body.taskTitle,
          body: req.body.taskBody,
          status: 0
        },
        { where: { id: teamId } }
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

  async show(req, res) {
    const teamId = req.params.team;
    await Team.findByPk(teamId).then((team) => {
      res.render('teams/show', { team });
    });
  }



}

module.exports = TeamsController;