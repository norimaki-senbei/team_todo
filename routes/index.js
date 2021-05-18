const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');

const route = new Route();

// function style
route.get('/', function (req, res, _next) {
  res.render('index', { title: 'Express', user: req.user });
});

// single style
//Laravelぽいルーティング
//コントローラの@以降の関数にいく
//forceLogin→ログインしてないと使えない（midlewaresに書いてある）

//ルーティング設定

//userに関するルーティング
route.get('/user/edit', forceLogin, 'users_controller@edit');
route.put('/user', forceLogin, 'users_controller@update');

//チーム名作成のルーティング
route.get('/teams/create', forceLogin, 'teams_controller@create');
route.post('/teams', forceLogin, 'teams_controller@store');
route.get('/teams/:team', forceLogin, 'teams_controller@show');
route.get('/teams/:team/edit', forceLogin, 'teams_controller@edit');
route.put('/teams/:team', forceLogin, 'teams_controller@update');
//route.post('/teams', forceLogin, 'teams_controller@edit');

// resource style
route.resource('examples', 'examples_controller');

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('users', 'admin/users_controller');

//taskのルーティング設定
const teamRoute = route.sub('/teams/:team', forceLogin);
teamRoute.resource('tasks', { controller: 'tasks_controller', only: ['store', 'create', 'update', 'edit'] });
//teamRoute.get('/:team/tasks/create', 'tasks_controller@create');
//teamRoute.post('/:team/tasks', 'tasks_controller@store');
//teamRoute.get('/:team/tasks/:task/edit', 'tasks_controller@edit');
//teamRoute.put('/:team/tasks/:task', 'tasks_controller@update');

module.exports = route.router;
