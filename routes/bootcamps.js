const express = require("express");
const router = express.Router();

//import controller
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
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


 
//export router
module.exports = router;
