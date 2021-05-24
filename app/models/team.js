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

    static async createWithOwner(user, body) {
      //チームをDBに保存
      const team = await this.create({
        name: body.teamName,
        ownerId: user.id
      });
      //チーム作成者をmanagerとしてMember登録する
      await team.createTeamMember({
        teamId: team.id,
        userId: user.id,
        role: 1
      });
      return team;
    }

    async isManager(user) {
      const members = await user.getUserMember({
        where: { teamId: this.id }
      });
      const member = members[0];
      return parseInt(member.role) === 1;
    }

  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'チーム名は必須です'
        }
    }},
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};