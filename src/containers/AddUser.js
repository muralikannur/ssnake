import { connect } from 'react-redux'
import AddUserComponent from '../components/AddUser'
import { login } from '../actions'

const mapDispatchToProps = dispatch => ({
  login: (user) => {
    dispatch(login(user))
  }
})

export const AddUser = connect(() => ({}), mapDispatchToProps)(AddUserComponent)