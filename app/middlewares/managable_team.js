const models = require('../models');
const User = models.User;

module.exports = async function managableTeam(req, res, next) {
  const user = await User.findByPk(req.user.id);
  const members = await user.getUserMember({
    where: { teamId: req.params.team }
  });
  const member = members[0];
  //managerはrole=1(roleはstring)
  const isManager = member.role;
  if (isManager == 1) {
    return next();
  }
  await req.flash('alert', 'アクセスできません');
  res.redirect('/');
};