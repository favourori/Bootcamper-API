const express = require("express");
const router = express.Router();

//import controller
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controllers/bootcamps");

//router.get("/", getBootcamps); another Method

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

//export router
module.exports = router;
