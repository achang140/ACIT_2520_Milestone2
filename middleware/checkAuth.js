module.exports = {
  ensureAuthenticated: function (req, res, next) { // next - Allows the Flow to Continue 
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  // Check if User is Login 
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) { // User NOT Log in, called Next to show Login Page 
      return next(); // Next Function 
    }
    res.redirect("/reminders"); // User Log in, Show Dashboard 
  },
};
