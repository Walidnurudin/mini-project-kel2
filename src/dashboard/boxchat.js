import React from 'react';
import './boxchat.css';

class Boxchat extends React.Component {

	render(){
		return (
			<div className="div-boxchat">
				<div className="cont-boxchat">
					<p className="pesan">
						{this.props.pesan}
					</p>
					<p className="tgl">
						{this.props.tgl}
					</p>
				</div>
				<div className="clear-boxchat"></div>
			</div>
		)
	}
}

export default Boxchat;