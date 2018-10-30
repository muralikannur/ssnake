import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  changeDirection,
  moveSnake,
  updatePoint,
  setActive,
  sendChangeDirection,
  sendSetActive
} from '../actions'
import BoardComponent from '../components/Board'


const mapDispatchToProps = dispatch => ({
  moveSnake: (pos,userid) => {
    dispatch(moveSnake(pos,userid))
  },
  changeDirection: (direction, isSelf) => {
    dispatch(changeDirection(direction,isSelf))
  },
  updatePoint: (point) => {
    dispatch(updatePoint(point))
  },
  setActive: (active, isSelf) => {
    dispatch(setActive(active, isSelf))
  },
  sendChangeDirection: (direction) => {
    dispatch(sendChangeDirection(direction))
  },
  sendSetActive: (active) => {
    dispatch(sendSetActive(active))
  }

})

  
  export const Board =  connect(
		state => ({
			users: state.users
		}),
		mapDispatchToProps
  )(BoardComponent)

