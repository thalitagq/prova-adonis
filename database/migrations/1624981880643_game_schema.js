'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments().primary();
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.integer('range').notNullable()
      table.float("price", 2, 2).notNullable();
      table.integer("max-number").notNullable();
      table.string("color").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

// eslint-disable-next-line no-undef
module.exports = GameSchema
