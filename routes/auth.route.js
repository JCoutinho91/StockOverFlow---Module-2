const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
const isLoggedIn = require("./../middleware/isLoggedIn");
//Importing Needed Packages


const saltRounds = 10;














module.exports = router;