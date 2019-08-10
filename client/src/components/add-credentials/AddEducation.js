import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profileActions";

export class AddEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            school: "",
            degree: "",
            fieldofStudy: "",
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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofStudy: this.state.fieldofStudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(eduData, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Back
							</Link>
                            <h1 className="diaplay-4 text-center">Add Education</h1>
                            <p className="lead text-center">
                                Add any school, bootcamp, etc that you have attended!!
								<small className="d-block pb-3">
                                    <sup style={{ color: "red" }}>*</sup> = Required Fields
								</small>
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* College"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />

                                <TextFieldGroup
                                    placeholder="* Degree or Certification"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />

                                <TextFieldGroup
                                    placeholder="* Field of Study"
                                    name="fieldofStudy"
                                    value={this.state.fieldofStudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofStudy}
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
                                        Current
									</label>
                                </div>

                                <TextAreaFieldGroup
                                    placeholder="Program Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about program that you were in"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addEducation }
)(withRouter(AddEducation));
