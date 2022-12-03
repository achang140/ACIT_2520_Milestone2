const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const data = require("../models/userModel")

const router = express.Router(); 

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login" 
  })
)

router.get("/register", (req, res) => res.render("auth/register"))

router.post("/register", 
(req, res) => {
  data.database.push({
    id: data.length + 1, 
    email: req.body.email, 
    password: req.body.password,
  })
  res.redirect("/auth/login")
})

module.exports = router;
