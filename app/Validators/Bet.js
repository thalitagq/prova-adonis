'use strict'

const Antl = use('Antl')

class Bet {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      total_price: "required",
      date: "required|date",
      numbers: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

// eslint-disable-next-line no-undef
module.exports = Bet
