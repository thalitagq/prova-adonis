"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BetSchema extends Schema {
  up() {
    this.create("bets", (table) => {
      table.increments().primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table
        .integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.integer("total_price").notNullable();
      table.timestamp("date").notNullable();
      table.string("numbers").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bets");
  }
}

// eslint-disable-next-line no-undef
module.exports = BetSchema;
