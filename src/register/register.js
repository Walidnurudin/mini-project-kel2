import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import './register.css';
import logo from '../logo.png';
import swal from 'sweetalert';

class Register extends React.Component {
	constructor(){
		super();
		this.state = {
			nama: '',
			telephone: '',
			email: '',
			password: '',
			confirmPassword: '',
			login: false,
			showPassword: false,
			showConfirmPassword: false
		}
	}


	// VALIDASI
	handleChangeNama = (e) => {
		this.setState({
			nama : e.target.value
		})
		console.log(this.state)

		if(e.target.value.length === 0 || e.target.value.length < 5){
			this.setState({
				errorNama: "at least 5 characters!"
			})
		}else{
			this.setState({
				errorNama: ''
			})
		}
	}

	handleChangeTelp = (e) => {
		this.setState({
			telephone : e.target.value
		})
		console.log(this.state)
	}

	handleChangeEmail = (e) => {
		this.setState({
			email: e.target.value
		})

		console.log(this.state)

		// if(e.target.value.length !== "@"){
		// 	this.setState({
		// 		errorEmail: 'must use the "@" symbol'
		// 	})
		// }else{
		// 	this.setState({
		// 		errorEmail: ''
		// 	})
		// }
	}

	handleChangePassword = (e) => {
		this.setState({
			password : e.target.value
		})

		console.log(this.state)

		if(e.target.value.length === 0 || e.target.value.length < 8){
			this.setState({
				errorPassword: "at least 8 characters"
			})
		}else{
			this.setState({
				errorPassword: ''
			})
		}
	}

	handleChangeConfirmPassword = (e) => {
		this.setState({
			confirmPassword : e.target.value
		})

		console.log(this.state)

		// if(e.target.value.length === "apa"){
		// 	this.setState({
		// 		errorConfirmPassword: ''
		// 	})
		// }else{
		// 	this.setState({
		// 		errorConfirmPassword: 'wrong'
		// 	})
		// }
	}
	// -----------

	handleSubmit = (e) => {
		e.preventDefault()

		const dataInput = {
			name: this.state.nama,
			phone: this.state.telephone,
			email: this.state.email,
			password: this.state.confirmPassword,
			confirm_password: this.state.confirmPassword
		}

		axios.post('https://yub-chat.herokuapp.com/api/register', dataInput)
		.then(res => {
			swal({
				text: "successfully created a new account!", 
				icon: "success"
			})
			this.setState({
				login: true
			})
			console.log(this.state.login)
		})
		.catch(err => {
			console.log('error = ', err)
			swal({
				text: "enter yout data in correct!", 
				icon: "warning"
			})
		})
	}

	showPassword = () => {
		const { showPassword } = this.state
		this.setState({
			showPassword : !showPassword
		})
	}

	showConfirmPassword = () => {
		const { showConfirmPassword } = this.state
		this.setState({
			showConfirmPassword : !showConfirmPassword
		})
	}

	render(){
		if(this.state.login === true ){
			return <Redirect to="/" />
		}
		return(
					<div className="cont-back-register">
						<div className="cont-register">
							<div className="logo-register-cont">
								<img className="logo-register" src={logo} alt="chat" />
								<p className="teks-logo-apk">One Chat</p>
								<p className="teks-logo-register">Create a new account</p>
								<hr/>
							</div>

							<form className="form-register" onSubmit={this.handleSubmit}>

								<div className="form-field">
									<label htmlFor="nama">Nama :</label>
									<i className="small material-icons icons-register-nama">account_box</i>
									<input 
										type="text" 
										name="nama" 
										id="nama" 
										value={this.state.nama}
										onChange={this.handleChangeNama}
										placeholder="enter your name"
									/>
									{this.state.errorNama && <span style={{color: "red"}}>{this.state.errorNama}</span>}
								</div>

								<div className="form-field">
									<label htmlFor="telephone">Telephone :</label>
									<i className="small material-icons icons-register-telephone">phone</i>
									<input 
										type="number" 
										name="telephone" 
										id="telephone" 
										value={this.state.telephone}
										onChange={this.handleChangeTelp}
										placeholder="enter your new telephone"
									/>
								</div>

								<div className="form-field">
									<label htmlFor="email">Email :</label>
									<i className="small material-icons icons-register-email">email</i>
									<input 
										type="text" 
										name="email" 
										id="email" 
										value={this.state.email}
										onChange={this.handleChangeEmail}
										placeholder="enter your email"
									/>
									{this.state.errorEmail && <span style={{color: "red"}}>{this.state.errorEmail}</span>}
								</div>

								<div className="form-field">
									<label htmlFor="Password">Password :</label>
									<i className="small material-icons icons-register-password">https</i>
									<input 
										type={(this.state.showPassword) ? "text" : "password"} 
										name="Password" 
										id="Password" 
										value={this.state.Password}
										onChange={this.handleChangePassword}
										placeholder="enter your password"
									/>
									{this.state.errorPassword && <span style={{color: "red"}}>{this.state.errorPassword}</span>}
									<i className="tiny material-icons icons-register-show" onClick={this.showPassword}>remove_red_eye</i>
								</div>

								<div className="form-field">
									<label htmlFor="confirmPassword">Confirm password :</label>
									<i className="small material-icons icons-register-password2">https</i>
									<input 
										type={(this.state.showConfirmPassword) ? "text" : "password"} 
										name="confirmPassword" 
										id="confirmPassword" 
										value={this.state.confirmPassword}
										onChange={this.handleChangeConfirmPassword}
										placeholder="enter your password again"
									/>
									{this.state.errorConfirmPassword && <span style={{color: "red"}}>{this.state.errorConfirmPassword}</span>}
									<i className="tiny material-icons icons-register-show2" onClick={this.showConfirmPassword}>remove_red_eye</i>
								</div>

								<div className="form-field-btn center">
								<button className="btn-register" type="submit">Register</button>
								</div>
							</form>
							
							<p className="teks-login">
								Already have an account? 
								<br/><Link to="/">Log in!</Link>
							</p>
						</div>
					</div>
		)
	}
}

export default Register;