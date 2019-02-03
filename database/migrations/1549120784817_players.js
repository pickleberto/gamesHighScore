'use strict'

const Schema = use('Schema')

class PlayerSchema extends Schema {

  up () {
    this.create('players', (table) => {
      table.increments()
      table.string('name').unique().notNullable();
      table.string('email').unique().notNullable();
      table.integer('score').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('players')
  }

}

module.exports = PlayerSchema
