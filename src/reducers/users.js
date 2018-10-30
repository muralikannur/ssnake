import * as types from '../constants/ActionTypes'

const users = (state = [], action) => {
	switch (action.type) {
		case types.USERS_LIST:
			let u = Object.assign([],state);
			u.push(action.users)
			return u
		case types.CHANGE_DIRECTION:
			return state.map(x => x.self == action.isSelf ? {...x,direction:action.direction} : x);
		case types.MOVE_SNAKE:
			return state.map(x => x.userid == action.userid ? {...x,pos:action.pos} : x);
		case types.UPDATE_POINT:
			return state.map(x => x.self ? {...x,point:action.point} : x);
		case types.SET_ACTIVE:
			return state.map(x => x.self == action.isSelf ? {...x,active:action.active} : x);

		default:
			return state
	}
}

export default users