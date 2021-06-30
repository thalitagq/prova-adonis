'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')

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
  async index ({ request }) {

    const { page } = request.get()

    const bets = await Bet.query()
      .with('user')
      .paginate(page)
      //fetch()
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
  async store ({ request, response, auth }) {
    const data = request.only(['bets'])
    const total = await this.totalPrice(data.bets);
    if (total < data.bets[0]['total_price']) {
      return response.status(401).send({
        error: {
          message:
            "The minimum value for bet is: " +
            data.bets[0]["total_price"] +
            ". Current value: " +
            total
        },
      });
    }

    let betsSaved = []
    for (const bet of data.bets) {
      await Bet.create({ ...bet, user_id: auth.user.id });
      betsSaved.push({ ...bet, user_id: auth.user.id });
    }
    
    return betsSaved
  }

  async totalPrice(bets){
    let total = 0

    for (const bet of bets) {
      let game = await Game.findByOrFail("id", bet.game_id);
      total += game.price
      console.log('TOTAL: ', total);
    }
    return total
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
