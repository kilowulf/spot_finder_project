const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // user.id is the mongo id
  // use mongo id since users may have multiple provider id's
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      console.log(profile.photos[0].value);
      // Query user collection for github id
      const existingUser = await User.findOne({
        githubId: profile.id
      });
      // check if user exists
      if (existingUser) {
        // user has record
        done(null, existingUser);
      } else {
        // user doesn't exist , need to generate record
        // save github profile id data in mongo user collection
        const user = await new User({
          githubId: profile.id,
          username: profile.username,
          displayname: profile.displayName,
          profileUrl: profile.profileUrl,
          photo: [{ value: profile.photos[0].value }],
          provider: profile.provider
        }).save(); // save record
        done(null, user); // second user instance from callback
      }
    }
  )
);
