const mongoose = require("mongoose");

//creating schema
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"]
  },
  description: { type: String, required: [true, "please add a description"] },
  weeks: { type: String, required: [true, "please add number of weeks"] },
  tuition: { type: Number, required: [true, "please add a tution amount"] },
  minimumSkill: {
    type: String,
    required: [true, "please enter a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipAvailable: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  bootcamp: { type: mongoose.Schema.ObjectId, ref: "Bootcamp", required: true }
});

//export Model
module.exports = mongoose.model("Course", CourseSchema);
