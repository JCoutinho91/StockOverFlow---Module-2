const router = require("express").Router();

// Auth Routes go here

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});



module.exports = router;
