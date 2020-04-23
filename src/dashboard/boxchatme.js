import React from 'react';
import './boxchatme.css';

class Boxchatme extends React.Component {

	render(){
		return (
			<div className="div-boxchatme">
				<div className="cont-boxchatme">
					<p className="pesan">
						{this.props.pesan}
					</p>
					<p className="tgl-me">
					<i className="tiny material-icons delete-pesan-ku" onClick={this.props.hapus}>delete</i> {this.props.tgl} 
					</p>
				</div>
				<div className="clear-boxchatme"></div>
			</div>
		)
	}
}

export default Boxchatme; 