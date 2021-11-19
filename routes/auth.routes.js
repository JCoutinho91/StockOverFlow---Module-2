const router = require("express").Router();

<<<<<<< HEAD
// Auth Routes go here
=======
// Routes Max
>>>>>>> 216f63b8d7e0b9fbfdb3e319aca66722e24abd23

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});



module.exports = router;
