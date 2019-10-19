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
      count: bootcamps.length,
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
    res.status(400).send(err.message);
  }
};

// @desc     get a single   Bootcamp
// @Route    POST /api/v1/bootcamps/:id
// @Access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).send({ success: false });
    }

    res.status(200).send({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc     Update a single   Bootcamp
// @Route    PUT /api/v1/bootcamps/:id
// @Access   Private
exports.updateBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return res.status(400).send({ success: false });
    }

    res.status(200).send({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).send({ success: false });
  }
};

// @desc     Delete a single   Bootcamp
// @Route    DELETE /api/v1/bootcamps/:id
// @Access   Private
exports.deleteBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).send({ success: false });
    }

    res.status(200).send({ success: true, data: {} });
  } catch (err) {
    res.status(400).send({ success: false });
  }
};
