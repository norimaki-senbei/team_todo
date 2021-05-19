const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Task = models.Task;
const Team = models.Team;
const User = models.User;
const Member = models.Member;

class MembersController extends Controller {
  
  async index(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    //teamIdに結びついたメンバーを全て抜き出す
    const members = await team.getTeamMember({
      order: [['userId', 'ASC']]
    });

    //userIdに関係するusernameの取得
    await members.forEach( async (member) => {
      const user = await member.getUser();
      member.userName = user.username;
    });
    const users = await User.findAll({
      order: [['id', 'ASC']]
    });
    //await console.log(members);
    res.render('members/index', { team: team, members: members, users: users } );
  }

  async store(req, res) {
    try{
      //チームをDBに保存
      const teamId = req.params.team;
      await Member.create({
        teamId: teamId,
        userId: req.body.addUserId
      });

      await req.flash('info', '新規メンバーを追加しました');
      res.redirect(`/teams/${teamId}/members`);

    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('tasks/create', { err: err });
      } else{
        throw err;
      }
    }
  }

}

module.exports = MembersController;