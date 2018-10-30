import React from 'react'
import PropTypes from 'prop-types'

const Sidebar = ({ users }) => (
	<aside id="sidebar" className="sidebar">
		<ul>
			{users.map(user => (
				<li key={user.userid}>{user.userName}</li>
			))}
		</ul>
	</aside>
)

export default Sidebar