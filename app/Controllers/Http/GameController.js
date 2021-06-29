'use strict'

const Game = use('App/Models/Game')

/**
 * Resourceful controller for interacting with games
 */
class GameController {
  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const games = await Game.all()

    return games
  }


  /**
   * Create/save a new game.
   * POST games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.all()

    const game = await Game.create(data)

    return game
  }

  /**
   * Display a single game.
   * GET games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const game = await Game.findByOrFail('id',params.id)

    return game
  }

  /**
   * Update game details.
   * PUT or PATCH games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const game = await Game.findByOrFail('id', params.id)
    const data = request.only(['type', 'description', 'price', 'range', 'max-number','color'])
    
    game.merge(data)

    await game.save()
    return game
  }

  /**
   * Delete a game with id.
   * DELETE games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const game = await Game.findByOrFail('id', params.id)

    await game.delete()
  }
}

// eslint-disable-next-line no-undef
module.exports = GameController
