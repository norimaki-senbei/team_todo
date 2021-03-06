const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');
const Team = models.Team;
const User = models.User;
const Member = models.Member;

class MembersController extends Controller {

  async index(req, res) {
    const teamId = req.params.team;
    const team = await Team.findByPk(teamId);
    //teamIdに結びついたメンバーを全て抜き出す
    const members = await team.getTeamMember({
      include: { model: User, as: 'User' },
      order: [ [ 'id', 'ASC' ] ]
    });

    const users = await User.findAll({
      order: [['id', 'ASC']]
    });
    //await console.log(members);
    res.render('manager/members/index', { team: team, members: members, users: users } );
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
      res.redirect(`/manager/teams/${teamId}/members`);

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