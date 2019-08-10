const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

//Get Posts
router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json(err));
});

//Get Single Posts
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ err, noPostFound: "Post Not Found" }));
});

//Add Post
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});

		newPost.save().then(post => res.json(post));
	}
);

//Delete Post
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.user.toString() !== req.user.id) {
						return res.status(401).json({ notAuthorize: "User not Authorize" });
					}

					post
						.remove()
						.then(() => res.json({ success: true }))
						.catch(err =>
							res.status(404).json({ noPostFound: "Post Not Found" })
						);
				})
				.catch(err => res.status(404).json({ noPostFound: "Post Not Found" }));
		});
	}
);

//Like Post
router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res
							.status(400)
							.json({ alreadyLiked: "User Already Liked this post!!" });
					}

					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ noPostFound: "Post Not Found" }));
		});
	}
);

//unLike Post
router.post(
	"/unlike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length === 0
					) {
						return res
							.status(400)
							.json({ alreadyLiked: "Please Like this Post First!!" });
					}

					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					post.likes.splice(removeIndex, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ noPostFound: "Post Not Found" }));
		});
	}
);

//Post Comment
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				post.comments.unshift(newComment);
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ noPostFound: "Post not Found" }));
	}
);

//Delete Comment
router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.comments.filter(
						cmt => cmt._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res.status(404).json({ notExists: "Comment Not Exists" });
				}

				const removeIndex = post.comments
					.map(cmt => cmt._id.toString())
					.indexOf(req.params.comment_id);
				post.comments.splice(removeIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ noPostFound: "Post not Found" }));
	}
);

module.exports = router;
