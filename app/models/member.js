'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Team = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'Team'
      });
      this.User = this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
      // define association here
    }
  };
  Member.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};