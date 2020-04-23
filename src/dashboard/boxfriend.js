import React from 'react';
import logo from '../logo.png';
import './boxfriend.css';

class Boxfriend extends React.Component {

	render() {
		return (
			<div className="box" onClick={this.props.click}>
				<div className="img-list">
					<img src={logo} alt="" className="img" />
				</div>
				<div className="name">
					<p>
						{this.props.name}
					</p>
				</div>
			</div>
		)
	}
}

export default Boxfriend;