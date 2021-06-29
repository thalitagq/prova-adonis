'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.group(()=>{
  Route.resource('bets', 'BetController').apiOnly()
  Route.resource("games", "GameController").apiOnly()
}).middleware(['auth'])