'use strict'

const Antl = use('Antl')

class Game {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      type: "required",
      description: "required",
      range: "required",
      price: "required",
      "max-number": "required",
      color: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

// eslint-disable-next-line no-undef
module.exports = Game
