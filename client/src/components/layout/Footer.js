import React from "react";

const footer = props => {
	return (
		<footer className="bg-dark text-white mt-5 p-4 text-center">
			Copyright &copy; {new Date().getFullYear()} Dev Connector
		</footer>
	);
};

export default footer;
