const express = require("express");
const router = express.Router();

//import controller
const { getBootcamps } = require("../controllers/bootcamps");

//router.get("/", getBootcamps); another Method

router.route("/").get(getBootcamps);

module.exports = router;
