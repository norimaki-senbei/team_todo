const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const Team = require('../models/team');

class TeamsController extends Controller {
  create(req, res) {
    //const user = req.user;
    res.render('teams/create');
  }
  async store(req, res) {
    //const user = req.user;
    //res.render('users/edit', { user });
    const teamName = req.body.teamName;
    console.log(req.body.teamName);
    console.log(Team.);
    await Team.create({
      name: teamName,
      ownerId: 1000
    });
    res.render('teams/create');
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