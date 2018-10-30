import * as types from '../constants/ActionTypes'
import {gameConfig} from '../gameConfig'


export const moveSnake = (pos, userid) => ({
	type: types.MOVE_SNAKE,
	pos,
	userid
})

export const changeDirection = (direction,isSelf) => ({
	type: types.CHANGE_DIRECTION,
	direction,
	isSelf
	
})

export const updatePoint = point => ({
	type: types.UPDATE_POINT,
	point
})

export const setActive = (active,isSelf) => ({
	type: types.SET_ACTIVE,
	active,
	isSelf
})

export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users
})



// Handled by Saga

export const sendChangeDirection = (direction) => ({
	type: types.WS_CHANGE_DIRECTION,
	direction,
	userid : gameConfig.oppUserId
})

export const sendSetActive = (active) => ({
	type: types.WS_SET_ACTIVE,
	active,
	userid : gameConfig.oppUserId
})







