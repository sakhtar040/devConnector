import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import PageNotFound from "./components/page-not-found/PageNotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import "./App.css";
//Check for token
if (localStorage.getItem("jwtToken")) {
	const token = localStorage.getItem("jwtToken");
	setAuthToken(token);
	//Decode Token
	const decoded = jwt_decode(token);
	//set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	//Check for expired tokens
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//logout user
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
								<PrivateRoute
									exact
									path="/add-experience"
									component={AddExperience}
								/>
								<PrivateRoute
									exact
									path="/add-education"
									component={AddEducation}
								/>
								<PrivateRoute exact path="/post/:id" component={Post} />
								<PrivateRoute exact path="/feed" component={Posts} />
							</Switch>
							<Route exact path="/page-not-found" component={PageNotFound} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
