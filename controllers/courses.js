//imoport Bootcamp model
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");

// @desc     Get all Courses
// @Route    GET /api/v1/courses
// @Route    GET /api/v1/bootcamps/:bootcampId/courses
// @Access   Public
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate({
      path: "bootcamp",
      select: "name description"
    });
    res.status(200).send({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    next(err);
  }
};

//Tasks - Create
//create Get course by ID
//Create Edit course
//create Delete course By ID
