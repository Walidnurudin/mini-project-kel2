import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png';
import './edit.css';
import swal from 'sweetalert';

class Edit extends React.Component {
	constructor(){
		super();
		this.state = {
			dataUser: '',
			avatar: '',
			nama: '',
			telephone: '',
			email: '',
			password: '',
			confirmPassword: '',
			showPassword: false,
			showConfirmPassword: false,
			loadingFriendslist: true
		}
	}

	componentDidMount(){
		axios.get("https://yub-chat.herokuapp.com/api/user-profil", {
			headers: localStorage
		})
		.then(res => {
			this.setState({
				// dataUser: res.data,
				nama: res.data[0].name,
				telephone: res.data[0].phone,
				email: res.data[0].email,
				loadingFriendslist: false
			})
			console.log("data user")
		})
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	// VALIDASI

	handleChangeFoto = (e) => {
		this.setState({
			avatar : e.target.files
		})
		console.log('foto ', this.state.avatar)

		// axios.post("https://yub-chat.herokuapp.com/api/profile", editData)
	}

	handleChangeNama = (e) => {

		this.setState({
			nama : e.target.value
		})

		if(e.target.value.length === 0 || e.target.value.length < 5){
			this.setState({
				errorNama : "at least 5 characters!"
			})
		}else{
			this.setState({
				errorNama : ""
			})
		}
	}

	handleChangePassword = (e) => {
		this.setState({
			password: e.target.value
		})

		if(e.target.value.length === 0 || e.target.value.length < 8){
			this.setState({
				errorPassword : "at least 8 characters!"
			})
		}else{
			this.setState({
				errorPassword : ''
			})
		}
	}

	handleChangeConfirmPassword = (e) => {
		this.setState({
			confirmPassword: e.target.value
		})

		if(e.target.value.length === 0 || e.target.value.length < 8){
			this.setState({
				errorConfirmPassword : "at least 8 characters!"
			})
		}else{
			this.setState({
				errorConfirmPassword : ''
			})
		}
	}

	// -------

	handleDone = () => {

		const updateData = {
			// avatar: this.state.avatar,
			name: this.state.nama,
			phone: this.state.telephone,
			email: this.state.email,
			password: this.state.password,
			confirm_password: this.state.confirmPassword
		}

		axios.post("https://yub-chat.herokuapp.com/api/profil", updateData, {
			headers : localStorage
		})

		swal({
			icon: "success",
			title: "updated"
		})
	}

	handleDelete = () => {
		// localStorage.removeItem('Authorization')
		swal({
			title: "Are you sure want to delete this account?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((Delete) => {
			if (Delete) {
			  swal("Your account has been deleted!", {
				icon: "success",
			  });
			}
		});
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
		console.log(this.state)

		if(localStorage.getItem('Authorization') == null){
			return <Redirect to='/' />
		}

		if(this.state.loadingFriendslist){
			return (
				<div className="loading-edit">
					<div className="preloader-wrapper big active">
						<div className="spinner-layer spinner-blue-only">
							<div className="circle-clipper left">
							<div className="circle"></div>
							</div><div className="gap-patch">
							<div className="circle"></div>
							</div><div className="circle-clipper right">
							<div className="circle"></div>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div>
				<div className="cont-edit">
					<div className="head-edit">
						<i className="small material-icons icons-edit-delete">delete_forever</i>
						<img src={logo} className="logo-edit" alt="chat" />
						{/* <input type="file" onChange={(e) => this.handleChangeFoto(e)}></input> */}
						
						<i className="tiny material-icons icons-edit-camera">camera_alt</i>
						<hr/>
					</div>

					<form className="form-edit">
								<div className="form-field">
									<label htmlFor="nama">Nama :</label>
									<i className="small material-icons icons-edit-nama">account_box</i>
									<input 
										type="text" 
										name="nama" 
										id="nama" 
										value={this.state.nama}
										onChange={this.handleChangeNama}
										placeholder="enter your new name"
									/>
									{this.state.errorNama && <span style={{color: "red"}}>{this.state.errorNama}</span>}
								</div>

								<div className="form-field">
									<label htmlFor="nama">Telephone :</label>
									<i className="small material-icons icons-edit-telephone">phone</i>
									<input 
										type="number" 
										name="telephone" 
										id="telephone" 
										value={this.state.telephone}
										onChange={this.handleChange}
										placeholder="enter your new telephone"
									/>
								</div>

								<div className="form-field">
									<label htmlFor="email">Email :</label>
									<i className="small material-icons icons-edit-email">email</i>
									<input 
										type="text" 
										name="email" 
										id="email" 
										value={this.state.email}
										onChange={this.handleChange}
										placeholder="enter your new email"
									/>
								</div>

								<div className="form-field">
									<label htmlFor="password">Password :</label>
									<i className="small material-icons icons-edit-password">https</i>
									<input 
										type={(this.state.showPassword) ? "text" : "password"} 
										name="password"
										id="password" 
										value={this.state.password}
										onChange={this.handleChangePassword}
										placeholder="enter your new password"
									/>
									{this.state.errorPassword && <span style={{color: "red"}}>{this.state.errorPassword}</span>}
									<i className="tiny material-icons icons-edit-passwordshow" onClick={this.showPassword}>remove_red_eye</i>
								</div>

								<div className="form-field">
									<label htmlFor="confirmPassword">Confirm password :</label>
									<i className="small material-icons icons-edit-confirmPassword">https</i>
									<input 
										type={(this.state.showConfirmPassword) ? "text" : "password"} 
										name="confirmPassword"
										id="confirmPassword" 
										value={this.state.confirmPassword}
										onChange={this.handleChangeConfirmPassword}
										placeholder="confirm your new password"
									/>
									{this.state.errorConfirmPassword && <span style={{color: "red"}}>{this.state.errorConfirmPassword}</span>}
									<i className="tiny material-icons icons-edit-confirmshow" onClick={this.showConfirmPassword}>remove_red_eye</i>
								</div>
					</form>

					<div className="btn-edit">

					<Link to="/dashboard"><button className="btn-done" onClick={this.handleDone}>Apply</button></Link>
					<Link to="/dashboard"><button className="btn-cancel">Cancel</button></Link>
					<Link to="/edit"><button className="btn-delete" onClick={this.handleDelete}>Delete account?</button></Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Edit;