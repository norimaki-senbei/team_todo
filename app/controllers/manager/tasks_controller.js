const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');
const Task = models.Task;
const Team = models.Team;
const User = models.User;

class TasksController extends Controller {
  async create(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    const members = await team.getTeamMember({
      include: { model: User, as: "User" },
      order: [['id', 'ASC']]
    });
    res.render('manager/tasks/create', { teamId: teamId, members: members } );
  }

  async store(req, res) {
    try{

      //チームをDBに保存
      const task = await Task.create({
        teamId: req.params.team,
        title: req.body.taskTitle,
        body: req.body.taskBody,
        assigneeId: req.body.selectedAssigneeId,
        creatorId: req.user.id,
        status: 0
      });

      await req.flash('info', '新規の予定' + task.title + 'を作成しました');
      res.redirect(`/manager/teams/${task.teamId}`);

    } catch (err) {
      if(err instanceof ValidationError) {
        const teamId = req.params.team;
        const team = await Team.findByPk(teamId);
        const members = await team.getTeamMember({
          include: { model: User, as: "User" },
          order: [['id', 'ASC']]
        });
        res.render('manager/tasks/create', { teamId: teamId, members: members, err: err });
      } else{
        throw err;
      }
    }
  }

  async edit(req, res) {
    const taskId = req.params.task;
    const teamId = req.params.team;

    const team = await Team.findByPk(teamId);
    const tasks = await team.getTeamTask({
      where: { id: taskId }
    });
    const task = tasks[0];

    const members = await team.getTeamMember({
      include: { model: User, as: "User" },
      order: [['id', 'ASC']]
    });
    //ToDo仮にteamIdとtaskIdが一致する物がなかった場合の処理の追加
    res.render('manager/tasks/edit', { task: task, teamId: teamId, members: members });
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
          assigneeId: req.body.selectedAssigneeId,
          creatorId: req.user.id,
          status: 0
        }
      );

      await req.flash('info', '予定' + task.title + 'を変更しました');
      res.redirect(`/manager/teams/${teamId}`);
    } catch (err) {
      if(err instanceof ValidationError) {
        const taskId = req.params.task;
        const teamId = req.params.team;

        const team = await Team.findByPk(teamId);
        const tasks = await team.getTeamTask({
          where: { id: taskId }
        });
        const task = tasks[0];

        const members = await team.getTeamMember({
          include: { model: User, as: "User" },
          order: [['id', 'ASC']]
        });
        res.render('manager/tasks/edit', { task: task, teamId: teamId, members: members, err: err });
      } else{
        throw err;
      }
    }
  }
}

module.exports = TasksController;