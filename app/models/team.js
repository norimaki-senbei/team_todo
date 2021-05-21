'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Owner = this.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      });
      this.TeamTask = this.hasMany(models.Task, {
        foreignKey: 'teamId',
        as: 'TeamTask'
      });
      this.TeamMember = this.hasMany(models.Member, {
        foreignKey: 'teamId',
        as: 'TeamMember'
      });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};