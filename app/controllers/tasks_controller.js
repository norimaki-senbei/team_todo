//const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Task = models.Task;
const Comment = models.Comment;
const User = models.User;

class TasksController extends Controller {
  async show(req, res) {
    const taskId = req.params.task;
    const task = await Task.findByPk(taskId);
    const comments = await task.getComments({
      include: { model: User, as: 'User' },
      order: [[ 'id', 'ASC' ]]
    });
    res.render('tasks/show', { task: task, comments: comments });
  }
  async comment(req, res) {
    try{
      const taskId = req.params.task
      let kind = 0
      if (req.body.isCompleted === 'completed') {
        const task = await Task.findByPk(taskId);
        await task.update({
          status: 1
        });
        kind = 1;
      }
      await Comment.create({
        taskId: taskId,
        creatorId: req.user.id,
        message: req.body.message,
        kind: kind
      });
      console.log(kind);
      res.redirect(`/tasks/${taskId}`);

    } catch (err) {
      if(err instanceof ValidationError) {
        const taskId = req.params.task;
        const task = await Task.findByPk(taskId);
        res.render('tasks/show', { task: task });
      } else{
        throw err;
      }
    }

  }
}

module.exports = TasksController;