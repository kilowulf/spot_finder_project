const passport = require("passport");

module.exports = app => {
  // http get to authenticate, passport authentication using profile, email
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["user:email"]
    })
  );

  // route for auth/google/callback: after authentication has taken place by google
  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  // log-out route
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
