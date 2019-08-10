import React from "react";

const PageNotFound = props => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="text-center jumbotron">
						<h1 className="text-danger">Page Not Found</h1>
						<p className="text-warning">Sorry, this page does not exist!!</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
