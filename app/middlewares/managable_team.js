module.exports = async function managableTeam(req, res, next) {
  if (req.user.isManager()) {
    return next();
  }
  await req.flash('alert', 'アクセスできません');
  res.redirect('/');
};