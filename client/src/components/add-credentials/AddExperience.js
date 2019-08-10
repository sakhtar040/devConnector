import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profileActions";

export class AddExperience extends Component {
	constructor(props) {
		super(props);

		this.state = {
			company: "",
			title: "",
			location: "",
			from: "",
			to: "",
			current: false,
			description: "",
			errors: {},
			disabled: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onCheck = e => {
		this.setState(prevState => ({
			disabled: !prevState.disabled,
			current: !prevState.current
		}));
	};

	onSubmit = e => {
		e.preventDefault();

		const expData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addExperience(expData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Back
							</Link>
							<h1 className="diaplay-4 text-center">Add Experience</h1>
							<p className="lead text-center">
								Add any jobs or position that you have had in the past or
								current
								<small className="d-block pb-3">
									<sup style={{ color: "red" }}>*</sup> = Required Fields
								</small>
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>

								<TextFieldGroup
									placeholder="* Job Title"
									name="title"
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>

								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
								/>

								<h6 className="text-info">From Date</h6>
								<TextFieldGroup
									name="from"
									type="date"
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>

								<h6 className="text-info">To Date</h6>
								<TextFieldGroup
									name="to"
									type="date"
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? "disabled" : ""}
								/>

								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										id="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
									/>
									<label htmlFor="current" className="form-check-label">
										Current Job
									</label>
								</div>

								<TextAreaFieldGroup
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us about your position"
								/>

								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addExperience }
)(withRouter(AddExperience));
