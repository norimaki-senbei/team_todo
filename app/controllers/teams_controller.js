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
    //const user = req.user;
    //res.render('users/edit', { user });
    const teamName = req.body.teamName;
    const userId = req.user.id;
    console.log(req.user.id);
    try{
      console.log(req.body.teamName);
      console.log(Team);
      await Team.create({
        name: teamName,
        ownerId: userId
      });
      res.render('teams/create');
    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('teams/create', { teamName, err: err });
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