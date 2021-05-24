const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Task = models.Task;
const Team = models.Team;
const User = models.User;

class TasksController extends Controller {
  async show(req, res) {
    const taskId = req.params.task;
    const task = await Task.findByPk(taskId);
    res.render('tasks/show', { task: task });
  }
}

module.exports = TasksController;