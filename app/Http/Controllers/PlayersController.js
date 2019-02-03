'use strict'

const Player = use('App/Model/Player')
const Validator = use('Validator')

class PlayersController {

  * index (request, response) { 
  	const players = yield Player.query().orderBy('score','desc').fetch();
  	yield response.sendView('home', {players: players.toJSON()}) 
  }

  * create(request, response){
  	yield response.sendView('players.create')
  }

  * show(request, response){
  	const player = yield Player.find(request.param('id'))
    yield response.sendView('players.show', { player: player.toJSON() })
  }

  * store (request, response) {
	const player = request.only('email', 'name')
  	const validation = yield Validator.validate(player, Player.validationRules())
	
    if (validation.fails()) {
		yield request
			.withOnly('name', 'email')
			.andWith({ errors: validation.messages() })
			.flash()
		response.redirect('back')
		return
    }
    player['score'] = 0;
	yield Player.create(player)
    response.redirect('/players')
	return
  }

  * addPlayer (request, response) {
  	const player = request.only('email', 'name')
  	const validation = yield Validator.validate(player, Player.validationRules())

    if (validation.fails()) {
    	response.status(420)
    	response.send(validation.messages())
		return
    }
    player.score = 0;
	const newPlayer = yield Player.create(player)
	response.send(newPlayer.id)
	return
  }

  * updateScore(request, response){
  	const user = request.only('email', 'password', 'score')
  	try{
  		yield request.auth.validate(user.email, user.password)
  		const player = yield Player.find(request.param('id'))
  		if(user.score > player.score){
	  		player.score = user.score
	  		yield player.save()
	  	}
  		response.send('' + player.name + ' new highscore = '+ player.score)
  	} catch (e) {
  		response.unauthorized({error: e.message})
  	}
  }

  * delete(request, response){
  	const user = request.only('email', 'password')
  	try{
  		yield request.auth.validate(user.email, user.password)
  		const player = yield Player.find(request.param('id'))
  		yield player.delete()
  		response.send('' + player.name + ' deleted')
  	} catch (e) {
  		response.unauthorized({error: e.message})
  	}	
  }

  * findPlayer(request, response){
  	const player = yield Player.findBy('name', request.param('name'))
  	response.send(player)
  }
}



module.exports = PlayersController