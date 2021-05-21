module.exports = async function managableTeam(req, res, next) {
  //const isManager = ;
  console.log("hogeeeeeeeee");
  if (1) {
    return next();
  }
  await req.flash('alert', 'アクセスできません');
  res.redirect('/');
};