const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');
const managableTeam = require('../app/middlewares/managable_team');

const route = new Route();

// function style
route.get('/', function (req, res, _next) {
  res.render('index', { title: 'Express', user: req.user });
});

// resource style
route.resource('manager/teams', { controller: 'manager/teams_controller', only: ['show', 'update', 'edit'] });
route.resource('manager/users', { controller: 'manager/users_controller', only: ['update', 'edit'] });
route.resource('teams', { controller: 'teams_controller', only: ['store', 'create'] });

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('users', 'admin/users_controller');

//taskのルーティング設定
const teamRoute = route.sub('/manager/teams/:team', forceLogin, managableTeam);
teamRoute.resource('tasks', { controller: 'manager/tasks_controller', only: ['store', 'create', 'update', 'edit'] });

//Memberのルーティング設定
teamRoute.resource('members', { controller: 'manager/members_controller', only: ['index', 'store'] });


module.exports = route.router;
