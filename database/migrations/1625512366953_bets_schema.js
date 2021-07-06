'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetsSchema extends Schema {
  up () {
    this.alter("bets", (table) => {
      table.float("total_price", 2, 2).notNullable().alter();
    });
  }

  down () {
    this.table('bets', (table) => {
      // reverse alternations
      table.integer("total_price").notNullable().alter();
    })
  }
}

// eslint-disable-next-line no-undef
module.exports = BetsSchema
