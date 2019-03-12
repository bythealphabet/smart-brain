import React from 'react'

class signin extends React.Component{
	constructor(props){
		super()
		this.state ={
			signInEmail:'',
			signInPassword:''
		}
	}


	onEmailChange = (event) => {
			this.setState({signInEmail:event.target.value})
		}

	onPasswordChange = (event) => {
			this.setState({signInPassword:event.target.value})
		}

	onSubmitSignin = () =>{
		fetch('https://secure-garden-83369.herokuapp.com/signin',{
			method: 'post',
			headers:{'content-type': 'application/json'},
			body:JSON.stringify({
				email:this.state.signInEmail,
				password:this.state.signInPassword
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
		const {onRouteChange} = this.props
		return(
			<div className="section">
				<div className="container">
					<div className="columns">
						<div className="column is-5">
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
							    <input onChange={this.onPasswordChange} 
							    className="input" 
							    type="password" 
							    placeholder="Password" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-lock"></i>
							    </span>
							  </p>
							</div>
							<div className="field">
							  <p className="control">
							    <button className="button is-success" onClick={this.onSubmitSignin}>
							      Login
							    </button>
							  </p>
							</div>
							<h4 className="subtitle is-4" onClick={()=>onRouteChange('register')} style={{cursor: "pointer"}}>Register</h4>

						</div>
					</div>
				</div>
			</div>
			
		)
	}	
}

export default signin