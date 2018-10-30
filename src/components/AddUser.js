import React from 'react'


class AddUser extends React.Component {
  
    constructor(props) {
        super(props);
        this.CreateUser = this.CreateUser.bind(this);
	}

	render(){
		let input

		return (
			<section id="new-user">
				<input
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							this.CreateUser(input.value)
							input.value = ''
						}
					}}
					type="text"
					ref={(node) => {
						input = node
					}}
				/>
	
			</section>
		)
	}

	CreateUser(userName) {

		let user = {
			pos:[{x:13,y:10},{x:12,y:10},{x:11,y:10},{x:10,y:10},{x:9,y:10},{x:8,y:10},{x:7,y:10},{x:6,y:10}],
			direction: 39,
			point: 0,
			userid:1,
			userName
		}
		this.props.login(user)
	}

}

export default AddUser