const express = require("express");
const router = express.Router();

//import controller
const { getBootcamps, createBootcamp } = require("../controllers/bootcamps");

//router.get("/", getBootcamps); another Method

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

module.exports = router;
