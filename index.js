const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
const port = process.env.PORT || 5000;

//DB Config
const db = require("./config/keys").mongoURI;
mongoose.Promise = global.Promise;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Database Connected"))
	.catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
	res.send("Hello");
});

//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => {
	console.log(`Server Connected to port ${port}`);
});
