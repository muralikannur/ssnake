const WebSocket = require('ws');
var os = require('os');
const wss = new WebSocket.Server({ port: 8989 })

let users = []
let games = []
let sockets = []

let userid = 0

const createGame = (userid) => {
	let newgame = []
	newgame.push(userid)
	games.push(newgame)
}

const notifyPlayerReady = (userid, user) => {
	if(sockets[userid] && sockets[userid].readyState === WebSocket.OPEN){
		sockets[userid].send(JSON.stringify({type:'PLAYER_READY',user}))
	}
}

const setgame = (userid) => {
	let isNewGame = true, oppId =0
	if(games.length > 0){
		let game = games[games.length - 1]
		if(game.length == 1 && game[0]){
			oppId = game[0]
			game.push(userid)
			let oppUser = users.find(u => u.userid == oppId)
			if(oppUser){
				oppUser.self = false
				notifyPlayerReady(userid, oppUser)
			}


			isNewGame = false
		} else {
			createGame(userid)
		}
	} else {
		createGame(userid)
	}
	return {isNewGame,oppId};
}

const createUser = (userid,userName) => {
	let y, gameid
	let {isNewGame,oppId} = setgame(userid)
	gameid = games.length + 1
	y = (isNewGame?15:35)

	let user = {
		pos:[{x:13,y},{x:12,y},{x:11,y},{x:10,y},{x:9,y},{x:8,y},{x:7,y},{x:6,y}],
		direction: 39,
		point: 0,
		userName,
		userid,
		active: true,
		gameid,
	}

	if(!isNewGame){
		u1 = Object.assign({},user)
		u1.self = false
		notifyPlayerReady(oppId, u1)
	}

	console.log(user);
	return user
}

wss.on('connection', (ws) => {
	
	ws.on('message', (message) => {
		const data = JSON.parse(message)
		switch (data.type) {
			case 'ADD_USER': {
				userid++
				let username = os.userInfo().username
				console.log(username)
				ws.id = userid
				sockets[userid] = ws
				let user = createUser(userid, username)

				users.push(user)
				user.self = true
				notifyPlayerReady(userid, user)

				break
			}
			case 'WS_CHANGE_DIRECTION':
			
				if(sockets[data.userid] && sockets[data.userid].readyState === WebSocket.OPEN){
					console.log(data)
					sockets[data.userid].send(JSON.stringify({type:'WS_CHANGE_DIRECTION',direction:data.direction}))
				}
				break;
			case 'WS_SET_ACTIVE':
			
				if(sockets[data.userid] && sockets[data.userid].readyState === WebSocket.OPEN){
					console.log(data)
					sockets[data.userid].send(JSON.stringify({type:'WS_SET_ACTIVE',direction:data.active}))
				}
			
			
				break
			default:
				break
		}
	})

	ws.on('close', () => {
		let game = games.find(g => g.includes(ws.id))
		if(game){
			let oppId = game.find(g => g != ws.id)
			if(oppId > 0 && sockets[oppId] && sockets[oppId].readyState === WebSocket.OPEN)
				sockets[oppId].send(JSON.stringify({type:'PLAYER_LEFT'}))
		}
		//sockets = sockets.filter(s => s != ws);
		//users = users.filter(u => u.userid != ws.id); 
	})


	ws.on('error', function (err) {
		console.log(err)
	});


})

wss.on('error', function (err) {
	console.log(err)
});

