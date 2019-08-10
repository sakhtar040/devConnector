const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validatePostInput = data => {
	let errors = {};
	data.text = !isEmpty(data.text) ? data.text : "";

	if (!Validator.isLength(data.text, { min: 10, max: 600 })) {
		errors.text = "Post must be in between 10 to 600 Characters";
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = "Text Field is Required";
	}

	return { errors, isValid: isEmpty(errors) };
};
