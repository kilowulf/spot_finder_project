const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("dotenv").config();

// ensure proper order of operations with these imports
require("./models/user");
require("./services/passport");

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Get the connection object
const db = mongoose.connection;

// Bind to the 'error' event to get notified of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind to the 'connected' event to get notified when connection is established
db.once("connected", () => {
  console.log("Successfully connected to MongoDB");
});

// Bind to the 'disconnected' event to get notified when disconnected
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

const app = express();

app.use(bodyParser.json());
// middleware for cookie-session
app.use(
  cookieSession({
    // set duration of cookie milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encrypt cookie
    keys: [process.env.COOKIE_KEY]
  })
);

// set passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// calling function from auth_routes.js and passing app as argument
require("./routes/oauth_route")(app);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get("/auth/github/callback", passport.authenticate("github"));

app.get("/", (req, res) => {
  res.send({ hey: "hello world" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
