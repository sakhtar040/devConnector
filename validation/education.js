const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateEducationInput = data => {
	let errors = {};
	data.school = !isEmpty(data.school) ? data.school : "";
	data.degree = !isEmpty(data.degree) ? data.degree : "";
	data.fieldofStudy = !isEmpty(data.fieldofStudy) ? data.fieldofStudy : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	if (Validator.isEmpty(data.school)) {
		errors.school = "School Field is Required";
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = "Degree Field is Required";
	}

	if (Validator.isEmpty(data.fieldofStudy)) {
		errors.fieldofStudy = "FieldofStudy Field is Required";
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = "From date Field is Required";
	}

	return { errors, isValid: isEmpty(errors) };
};
