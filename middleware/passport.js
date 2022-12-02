const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");

// {email: "", password: ""}  from authRoute should match localLogin username and password 
const localLogin = new LocalStrategy(
  // Replacing (default) username with email 
  // Option Dictionary that overwrites the Passport Default 
  {
    usernameField: "email",
    passwordField: "password",
  },
  // Verify if Identity of Users exists in DB 
  (email, password, done) => {
    /* 
    Database Object of 1 user  
    */

    // Exist - user Variable will Store Info 
    // Not Exist = null 
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user // If User exists in DB, must call "done" function 
      ? done(null, user) // No Error 
      : done(null, false, { // User does NOT exist, error message 
          message: "Your login details are not valid. Please try again",
        });
  }
);

// Controls what goes in and out of Session 
// Serialization - Only Called Once When Login -> Creates a Session Storing User ID 
passport.serializeUser(function (user, done) { // user Parameter will have the whole object (entire information of user)
  done(null, user.id); // Only Storing User ID from DB  
});

// Deserialization - 
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  /* 
  DB Object of 1 User 
  */ 
  if (user) {
    done(null, user); // The whole Object from DB (IndexRoute - )
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
