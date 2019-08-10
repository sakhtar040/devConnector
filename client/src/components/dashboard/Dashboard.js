import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

export class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteAccount(e) {
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome{" "}
							<Link to={`/profile/${profile.handle}`}>
								<strong className="text-info">{user.name}</strong>
							</Link>
						</p>

						<ProfileActions />

						{profile.experience.length ? (
							<Experience experience={profile.experience} />
						) : (
							<h6 className="text-warning">Add Experience in your Profile</h6>
						)}

						{profile.education.length ? (
							<Education education={profile.education} />
						) : (
							<h6 className="text-warning">
								Add Educational Details in your Profile
							</h6>
						)}

						<button
							onClick={this.onDeleteAccount.bind(this)}
							className="btn btn-danger mt-30"
						>
							Delete Account
						</button>
					</div>
				);
			} else {
				//User is Logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <strong className="text-info">{user.name}</strong>
						</p>
						<p>You have not setup a profile, please add some info...</p>
						<Link to="/create-profile" className="btn btn-info btn-lg">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h2>Dashboard</h2>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
