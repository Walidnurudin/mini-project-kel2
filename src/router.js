import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Dashboard from './dashboard/dashboard';
import Edit from './edit/edit';
import Nomacth from './nomacth/nomacth';

const Router = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/edit" component={Edit} />
				<Route component={Nomacth} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router;