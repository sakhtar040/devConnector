import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { deleteComment } from "../../actions/postActions";

export class CommentItem extends Component {
	onDeleteComment = (postId, commentId) => {
		if (window.confirm("Are you sure??")) {
			this.props.deleteComment(postId, commentId);
		}
	};

	render() {
		const { comment, postId, auth } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to="/profile">
							<img
								className="rounded-circle d-none d-md-block"
								src={comment.avatar}
								alt={comment.name}
							/>
						</Link>
						<br />
						<p className="text-center">{comment.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{comment.text}</p>
						{comment.user === auth.user.id ? (
							<button
								className="btn btn-danger mr-1 float-right"
								type="button"
								onClick={this.onDeleteComment.bind(this, postId, comment._id)}
							>
								<i className="fas fa-trash" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.defaultProps = {
	showActions: true
};

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
