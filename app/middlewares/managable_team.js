const models = require('../models');
const User = models.User;
const Team = models.Team;

module.exports = async function managableTeam(req, res, next) {

  const user = await User.findByPk(req.user.id);
  const team = await Team.findByPk(req.params.team);

  if (!await team.isManager(user)) {
    await req.flash('alert', 'アクセスできません');
    res.redirect('/');
  }
  return next();
};