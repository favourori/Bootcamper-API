//imoport Bootcamp model
const Bootcamp = require("../models/Bootcamp");

// @desc     Get all Bootcamps
// @Route    GET /api/v1/bootcamps
// @Access   Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).send({
      sucess: true,
      data: bootcamps
    });
  } catch (err) {
    console.log("Error: ", err.message);
  }
};

// @desc     Create new  Bootcamps
// @Route    POST /api/v1/bootcamps
// @Access   Private

exports.createBootcamp = async (req, res) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body);
    res.status(201).send({ success: true, data: newBootcamp });
  } catch (err) {
    res.status(400).send(err.message)
  }
};


// @desc     get a single   Bootcamp
// @Route    POST /api/v1/bootcamps/:id
// @Access   Public

exports.getBootcamp = async (req, res) => {
  try {
   

  } catch (err) {
    res.status(400).send(err.message)
  }
};