import { takeEvery, put } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
	yield takeEvery(types.WS_SET_ACTIVE, (action) => {
		params.socket.send(JSON.stringify(action))
	})
	yield takeEvery(types.WS_CHANGE_DIRECTION, (action) => {
		params.socket.send(JSON.stringify(action))
	})
}



export default handleNewMessage