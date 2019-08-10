import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

export class ProfileItem extends Component {
	render() {
		const { profile } = this.props;

		return (
			<div className="profile card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img
							src={profile.user.avatar}
							alt={profile.user.name}
							className="rounded-circle"
						/>
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3 className="text-info">{profile.user.name}</h3>
						<p className="text-muted">
							{profile.status}{" "}
							{isEmpty(profile.company) ? null : (
								<span>@ {profile.company}</span>
							)}
						</p>
						{/* <p className="text-muted">
							{isEmpty(profile.location) ? null : (
								<span>{profile.location}</span>
							)}
						</p> */}
						<Link to={`/profile/${profile.handle}`} className="btn btn-info">
							View Profile
						</Link>
					</div>
					<div className="col-md-4 d-none d-md-block">
						<h4>Skill Set</h4>
						<ul className="list-group">
							{profile.skills.slice(0, 4).map((skill, index) => (
								<li key={index} className="list-group-item">
									<i className="fa fa-check pr-1" /> {skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
