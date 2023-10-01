const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.put("/api/update_user_preferences", async (req, res) => {
    try {
      // Assuming user is logged in and req.user is populated.
      const user = await User.findOne({ githubId: req.user.githubId });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Update the preferences in the user model and save.
      user.languages = req.body.languages || [];
      user.frameworks = req.body.frameworks || [];
      user.experienceLevel = req.body.experience;

      await user.save();
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send("Server error");
    }
  });
};
