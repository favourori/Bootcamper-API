const express = require("express");
const router = express.Router();





//import controller
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  getBootcampCourses
} = require("../controllers/bootcamps");


//router.get("/", getBootcamps); another Method
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)
router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/:id/courses").get(getBootcampCourses)
 
//export router
module.exports = router;
