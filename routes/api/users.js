const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/", (req, res) => {
	res.json({ msg: "User Api" });
});

router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			//Avatar
			const avatar = gravatar.url(req.body.email, {
				s: "200",
				r: "pg",
				d: "mm"
			});
			//Create New User
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	//Find User
	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = "User not Found";
			return res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				//Assign Token
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};
				jwt.sign(
					payload,
					keys.secretOrkey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({ success: true, token: `Bearer ${token}` });
					}
				);
			} else {
				errors.password = "Password is Incorrect";
				return res.status(404).json(errors);
			}
		});
	});
});

module.exports = router;
