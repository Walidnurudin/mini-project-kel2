import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import swal from 'sweetalert';
import './login.css';
import logo from '../logo.png';

class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			token: '',
			showPassword: false
		}
	}

	handleSubmit = e => {
		e.preventDefault()

		const dataInput = {
			email: this.state.email,
			password: this.state.password
		}

		axios.post("https://yub-chat.herokuapp.com/api/login", dataInput)
		.then(res => {
			localStorage.setItem('Authorization', `Bearer ${res.data.token}`)
			this.setState({
				email: '',
				password: '',
				token: res.data.token,
			 })
			 swal({
				icon: "success",
				title: "login successfully"
			})
			console.log("token add")
		})
		.catch((err) => {
			swal({
				icon: "warning",
				title: "Please enter the correct email and password"
			})
			console.log('Error = ', err)
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	showPassword = () => {
		const {showPassword} = this.state
		this.setState({
			showPassword : !showPassword
		})
	}

	render(){
		console.log(this.state)
		if(localStorage.getItem('Authorization')){
			return <Redirect to="/dashboard" />
		}
		return(
				<div>
						
						<div className="cont-login">
							<div className="logo-login-cont">
								<img className="logo-login" src={logo} alt="chat" />
								<p className="teks-logo-apk">One Chat</p>
								<p className="teks-logo-login">Login</p>
								<hr/>
							</div>

							<form className="form-login" onSubmit={this.handleSubmit}>
								<div className="form-field">
									<label htmlFor="email">email :</label>
									<i className="small material-icons icons-login-email">email</i>
									<input 
										type="text" 
										name="email"
										id="email"
										value={this.state.email}
										onChange={this.handleChange}
										placeholder="enter your email"
									/>
								</div>

								<div className="form-field">
									<label htmlFor="password">password :</label>
									<i className="small material-icons icons-login-password">https</i>
									<input 
										type= {(this.state.showPassword) ? "text" : "password"}
										name="password"
										id="password"
										value={this.state.password}
										onChange={this.handleChange}
										placeholder="enter your password"
									/>
									 <i className="tiny material-icons icons-login-show" onClick={this.showPassword}>remove_red_eye</i>
								</div>

								<div className="div-btn">
									<button className="btn-login" type="submit">Login</button>
								</div>
							</form>
							<p className="teks-register">
							Don't have an account?
								<br/><Link to="/register">Create a new account!</Link>
							</p>
						</div>
					</div>
			
		)
	}
}

export default Login;