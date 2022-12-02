// let database = require("../database");
// const userModel = require("../models/userModel").userModel;

// let authController = {
//   login: (req, res) => {
//     res.render("auth/login");
//   },

//   register: (req, res) => {
//     res.render("auth/register");
//   },

//   loginSubmit: (req, res) => {
//     // implement
//     // Handle by Passport - Middle Man 

//   },

//   registerSubmit: (req, res) => {
//     // implement
//     // Append User Info to Database 
//   },
// };

// module.exports = authController;

const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const data = require("../models/userModel")

const router = express.Router(); // Allow Access to the app Variable 

// get - Server get info from host 
// post - Server send info to host 

// router.get - URL; res.render("EJS_PATH")
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

// passport.authenticate - authenticates a user with a username and password
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login" 
  })
)

router.get("/register", (req, res) => res.render("auth/register"))

// res.body contains username (email) and password 
router.post("/register", 
(req, res) => {
  data.database.push({"id": data.length + 1, "name": req.body.email, "email": req.body.email, "password": req.body.password})
  res.redirect("/auth/login")
})

module.exports = router;
