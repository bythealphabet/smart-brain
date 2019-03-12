import React from 'react'

class register extends React.Component{
	constructor(props){
		super()
		this.state ={
			name:'',
			email:'',
			password:''
		}
	}

	onNameChange = (event) => {
			this.setState({name:event.target.value})
		}


	onEmailChange = (event) => {
			this.setState({email:event.target.value})
		}

	onPasswordChange = (event) => {
			this.setState({password:event.target.value})
		}

	onSubmitSignin = () =>{
		fetch('https://secure-garden-83369.herokuapp.com/register',{
			method: 'post',
			headers:{'content-type': 'application/json'},
			body:JSON.stringify({
				name:this.state.name,
				email:this.state.email,
				password:this.state.password
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if (user.id){
				this.props.loadUser(user)
				this.props.onRouteChange('home')
			}
		})
	}

	render(){
		return(
			
		<div className="section">
			<div className="container">
				<div className="columns">
					<div className="column is-5">
						<div className="field">
						  <p className="control has-icons-left has-icons-right">
						    <input onChange={this.onNameChange} className="input" type="text" placeholder="Name" />
						    <span className="icon is-small is-left">
						      <i className="fas fa-envelope"></i>
						    </span>
						    <span className="icon is-small is-right">
						      <i className="fas fa-check"></i>
						    </span>
						  </p>
						</div>
						<div className="field">
						  <p className="control has-icons-left has-icons-right">
						    <input onChange={this.onEmailChange} className="input" type="email" placeholder="Email" />
						    <span className="icon is-small is-left">
						      <i className="fas fa-envelope"></i>
						    </span>
						    <span className="icon is-small is-right">
						      <i className="fas fa-check"></i>
						    </span>
						  </p>
						</div>
						<div className="field">
						  <p className="control has-icons-left">
						    <input onChange={this.onPasswordChange} className="input" type="password" placeholder="Password" />
						    <span className="icon is-small is-left">
						      <i className="fas fa-lock"></i>
						    </span>
						  </p>
						</div>
						<div className="field">
						  <p className="control">
						    <button className="button is-success" onClick={this.onSubmitSignin}>
						      Submit
						    </button>
						  </p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	)
	}
	
}

export default register