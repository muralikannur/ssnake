import *  as types from '../constants/ActionTypes'
import {populateUsersList, changeDirection, setActive} from '../actions'
import {gameConfig} from '../gameConfig'

const setupSocket = (dispatch) => {
	const socket = new WebSocket('ws://localhost:8989')

	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: types.ADD_USER
		}))
	}
	socket.onmessage = (event) => {
		const data = JSON.parse(event.data)
		switch (data.type) {
			// case types.ADD_MESSAGE:
			// 	dispatch(messageReceived(data.message, data.author))
			// 	break
			// case types.ADD_USER:
			// 	dispatch(addUser(data.name))
			// 	break
			case types.PLAYER_READY:
				dispatch(populateUsersList(data.user))
				if(data.user.self){
					gameConfig.userId = data.user.userid
				} else {
					gameConfig.oppUserId = data.user.userid
				}
				if(gameConfig.userId != 0 && gameConfig.oppUserId ){
					gameConfig.startGame = true;
				}
				break
			case types.WS_CHANGE_DIRECTION:
				dispatch(changeDirection(data.direction, false))
				break
			case types.WS_SET_ACTIVE:
				dispatch(setActive(data.active, false))
				break
			default:
				break
		}
	}
	return socket
}

export default setupSocket
