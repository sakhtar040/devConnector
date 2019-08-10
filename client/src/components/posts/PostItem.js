import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { deletePost, likePost, unlikePost } from "../../actions/postActions";

export class PostItem extends Component {
	onDeletePost = post_id => {
		if (window.confirm("Are you sure??")) {
			this.props.deletePost(post_id);
		}
	};

	onLikePost = post_id => {
		this.props.likePost(post_id);
	};

	onunLikePost = post_id => {
		this.props.unlikePost(post_id);
	};

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to="/profile">
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt={post.name}
							/>
						</Link>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{showActions ? (
							<span>
								<button
									className="btn btn-light mr-1"
									type="button"
									onClick={this.onLikePost.bind(this, post._id)}
								>
									<i
										className={classnames("fas fa-thumbs-up", {
											"text-info": this.findUserLike(post.likes)
										})}
									/>
								</button>
								<span className="badge badge-ligh">{post.likes.length}</span>
								<button
									className="btn btn-light mr-1"
									type="button"
									onClick={this.onunLikePost.bind(this, post._id)}
								>
									<i className="text-secondary fas fa-thumbs-down" />
								</button>
								<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
									<i className="fas fa-envelope" />
								</Link>
								{post.user === auth.user.id ? (
									<button
										className="btn btn-danger mr-1 float-right"
										type="button"
										onClick={this.onDeletePost.bind(this, post._id)}
									>
										<i className="fas fa-trash" />
									</button>
								) : null}
							</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deletePost, likePost, unlikePost }
)(PostItem);
