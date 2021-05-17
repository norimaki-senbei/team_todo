const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const Team = models.Team;

class TeamsController extends Controller {
  create(req, res) {
    //const user = req.user;
    res.render('teams/create');
  }
  async store(req, res) {
    const teamName = req.body.teamName;
    const userId = req.user.id;
    try{
      //チームをDBに保存
      const team = await Team.create({
        name: teamName,
        ownerId: userId
      });
      
      await req.flash('info', '新規チーム'+team.name+'を作成しました');
      const teamId = team.id;
      res.redirect(`/teams/${teamId}`);

    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('teams/create', { teamName, err: err });
      } else{
        throw err;
      }
    }
  }

  async show(req, res) {
    const teamId = req.params.team;
    await Team.findByPk(teamId).then((team) => {
      res.render('teams/show', {team});
    });
  }

  async edit(req, res) {
    const teamId = req.params.team;
    await Team.findByPk(teamId).then((team) => {
      res.render('teams/edit', {team});
    });
  }

  async update(req, res) {
    try{
      const teamId = req.params.team;
      const teamName = req.body.teamName;
      const team = await Team.findByPk(teamId);
      await team.update(
        {name: teamName},
        {where: {id: teamId}}
      );
      await req.flash('info', 'チーム名を'+team.name+'に変更しました');
      res.redirect(`/teams/${teamId}`);
    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('teams/edit', { teamName, err: err });
      } else{
        throw err;
      }
    }
  }
  //async update(req, res) {
  //  const user = req.user;
  //  try {
  //    user.displayName = req.body.displayName;  
  //    await user.save();
  //    await req.flash('info', '更新しました');
  //    res.redirect(`/user/edit`);
  //  } catch (err) {
  //    if(err instanceof ValidationError) {
  //      res.render('users/edit', { user, err: err });
  //    } else{
  //      throw err;
  //    }
  //  }
  //}
}

module.exports = TeamsController;