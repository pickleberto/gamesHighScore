'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'PlayersController.index')
Route.resource('players', 'PlayersController').only('create', 'store', 'show', 'index')


Route.post('api/add', 'PlayersController.addPlayer')
Route.post('api/update/:id', 'PlayersController.updateScore')
Route.delete('api/delete/:id', 'PlayersController.delete')
Route.get('api/player/:name', 'PlayersController.findPlayer')

