'use strict'

const Bet = use('App/Models/Bet')

/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const bets = await Bet.query().with('user').fetch()

    return bets
  }


  /**
   * Create/save a new bet.
   * POST bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.all()

    const bet = await Bet.create({...data, user_id: auth.user.id})

    return bet
  }

  /**
   * Display a single bet.
   * GET bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {

    const bet = await Bet.findByOrFail('id', params.id)

    return bet
  }

  /**
   * Update bet details.
   * PUT or PATCH bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const bet = await Bet.findByOrFail('id', params.id)
    const data = request.all()

    bet.merge(data)

    await bet.save()

    return bet
  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id   
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const bet = await Bet.findByOrFail('id', params.id)

    await bet.delete()
  }
}

// eslint-disable-next-line no-undef
module.exports = BetController
