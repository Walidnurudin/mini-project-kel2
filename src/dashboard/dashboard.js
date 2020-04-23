import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './dashboard.css';
import logo from '../logo.png';
import Boxfriend from './boxfriend';
import Boxchat from './boxchat';
import Boxchatme from './boxchatme';
import axios from 'axios';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			dataPesan: [],
			dataUser: '',
			pesan: '',
			namaTeman: '',
			phoneTeman: '',
			to_id: null,
			id_pesan: null,
			avatarTeman: '',
			loadingFriendslist: true
		}
	}

	// klikPesan = (i) => {

		// this.setState({
		// 	id_pesan: i
		// })

	// 	console.log("klik pesan", i)
	// }

	deletePesan = async (e) => {

		try {
		await	this.setState({
				id_pesan: e.id
			})
			
			let res = await axios.delete(`https://yub-chat.herokuapp.com/api/pesan/${this.state.id_pesan}`, {
				headers : localStorage
			})	

			await console.log(res)
		} catch (error) {
		console.log(error)		
		}
	
	}

	getPesan = () => {
		axios.get("https://yub-chat.herokuapp.com/api/pesan", {
			headers: localStorage
		})
			.then(res => {
				this.setState({
					dataPesan: res.data
				})
				// console.log("data pesan ", this.state.dataPesan)
			})
			.catch(err => console.log("errors = ", err))
	}

	componentDidMount() {


		axios.get("https://yub-chat.herokuapp.com/api/users", {
			headers: localStorage
		})
			.then(res => {
				this.setState({
					data: res.data
				})
				console.log("data")
			})
			.catch(err => console.log("Error = ", err))


		axios.get("https://yub-chat.herokuapp.com/api/user-profil", {
			headers: localStorage
		})
			.then(res => {
				this.setState({
					dataUser: res.data,
					loadingFriendslist: false
				})
				console.log("data user")
			})

		this.getPesan()
	}

	componentDidUpdate() {
		this.getPesan()
	}

	handleChat = (i) => {
		this.setState({
			namaTeman: i.name,
			phoneTeman: i.phone,
			to_id: i.id,
			avatar: i.avatar
		})
		// console.log(i.id)

		// axios.get(`https://yub-chat.herokuapp.com/api/pesan/${this.state.to_id}`, {
		// 	headers: localStorage
		// })
		// .then(res => {
		// 	this.setState({
		// 		dataPesan: res.data
		// 	})
		// 	console.log("pesan = ", this.state.dataPesan)
		// })
		// .catch(err => console.log(" error slur =", err ))
		// console.log("masuk")

	}

	handleLogout = () => {
		localStorage.removeItem('Authorization')
	}

	handleChange = (e) => {
		this.setState({
			pesan: e.target.value
		})
	}

	kirim = (e) => {
		e.preventDefault()

		const dataKirim = {
			pesan: this.state.pesan,
			is_read: 0,
			to_id: this.state.to_id
		}

		axios.post("https://yub-chat.herokuapp.com/api/pesan", dataKirim, {
			headers: localStorage
		})
			.then(res => {
				this.getPesan()
			})

		console.log("post ok")
		this.setState({
			pesan: ''
		})
	}

	//  && this.state.to_id === items.to_id

	chat = () => {
		if (this.state.to_id != null) {
			return (
				this.state.dataPesan.map((items, index) => {
					// console.log("map ", items.pesan)
					// return <Boxchatme key={index} pesan={items.pesan} />
					if (items.from_id === this.state.dataUser[0].id && this.state.to_id === items.to_id) {
						if(items.pesan === null){
							return <div key={index}></div>
						}else{
							return <Boxchatme
								key={index} 
								tgl={items.created_at} 
								pesan={items.pesan}
								hapus={() => this.deletePesan(items)}
							/>
						}
					} else if (this.state.to_id === items.from_id) {
						if(items.pesan === null){
							return <div key={index}></div>
						}else{
							return <Boxchat 
								key={index} 
								tgl={items.created_at} 
								pesan={items.pesan}
							/>
						}
					} else {
						return <div key={index}></div>
					}
				})
			)
		} else {
			return <div className="no">no message</div>
		}
	}

	input = () => {
		if (this.state.to_id !== null) {
			return (
				<div className="input">
					<form className="form-textarea">
						<div className="teks-input">
							<textarea
								id="input-chat"
								type="text"
								placeholder="Type something..."
								value={this.state.pesan}
								onChange={this.handleChange}>
							</textarea>
						</div>

						<div className="btn-input">
							<i className="small material-icons icons-send" onClick={this.kirim}>send</i>
						</div>
					</form>
				</div>
			)
		} else {
			return <div></div>
		}
	}

	render() {
		if (localStorage.getItem('Authorization') == null) {
			return <Redirect to='/' />
		}
		if (this.state.loadingFriendslist) {
			return (
				<div className="loading-dash">
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
			<div className="cont-dashboard">

				<div className="sidebar-dash">
					<Link to="/edit">
						<div className="sidebar-head">
							<div className="div-logo-profile">
								{/* this.state.dataUser[0].avatar */}
								<img src={logo} className="logo-profile" alt="logo" />
							</div>
							<div className="logo-name">
								<p>{this.state.dataUser[0].name}<br />{this.state.dataUser[0].phone}</p>
							</div>
							{/* <div className="sidebar-logo-kosong"></div> */}
						</div>
					</Link>

					<div className="sidebar-list">
						{
							this.state.data.map((i) => {
								return <Boxfriend
									key={i.id}
									name={i.name}
									click={() => { this.handleChat(i) }}
								/>
							})
						}
					</div>

					<div className="off">
						<Link to="/"><i className="small material-icons icons-off" onClick={this.handleLogout}>power_settings_new</i></Link>
					</div>
				</div>


				<div className="content-dash">
					<div className="div-view-head">
						<div className="view-head">
							<div className="div-logo-dash">
								<img src={logo} className="logo-dash" alt="logo" />
							</div>
							<div className="div-dash-name">
								<p>{this.state.namaTeman}<br/>{this.state.phoneTeman}</p>
							</div>
						</div>
					</div>

					<div className="view-chat">
						{this.chat()}
					</div>
					{this.input()}
				</div>
			</div>
		)
	}
}

export default Dashboard;