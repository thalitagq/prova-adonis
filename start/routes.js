"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.group(() => {
  Route.resource("bets", "BetController")
    .apiOnly()
    .validator(new Map([[["bets.store"], ["Bet"]]]))
  Route.resource("games", "GameController")
    .apiOnly()
    .validator(new Map([[['games.store'], ['Game']]]))
}).middleware(["auth"]);
