const express = require("express");
const router = express.Router();

//import controller
const {
  getBootcamps,
  createBootcamp,
  getBootcamp
} = require("../controllers/bootcamps");

//router.get("/", getBootcamps); another Method

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router.route("/:id").get(getBootcamp);
module.exports = router;
