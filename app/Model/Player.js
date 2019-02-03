'use strict'

const Lucid = use('Lucid')

class Player extends Lucid{
	static validationRules() {
		return {
			name: 'required|unique:players,name',
			email: 'required|email|unique:players,email',
		}	
	}
}

module.exports = Player