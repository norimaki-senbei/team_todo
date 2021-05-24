'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Team = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'Team'
      });
      this.Creator = this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'Creator'
      });
      this.Assignee = this.belongsTo(models.User, {
        foreignKey: 'assigneeId',
        as: 'Assignee'
      });
    }
  }
  Task.init({
    teamId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'タイトルはからではいけません'
        },
        len: {
          args: [1, 9],
          msg: 'タイトルは10文字未満です'
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 29],
          msg: '本文は30文字未満です'
        }
      }
    },
    status: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};