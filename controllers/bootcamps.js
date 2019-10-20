//imoport Bootcamp model
const Bootcamp = require("../models/Bootcamp");
const geoCoder = require("../utils/geocoder");
const ErrorResponse = require("../utils/errorResponse");
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
    next(err);
  }
};

// @desc     get a single   Bootcamp
// @Route    GET /api/v1/bootcamps/:id
// @Access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with the Id of ${req.params.id} not found`,
          404
        )
      );
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
    next(err);
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
    next(err);
  }
};

// @desc     get bootcamps within a given radius
// @Route    GET /api/v1/bootcamps/radius/:zipcode/:distance
// @Access   Public
exports.getBootcampsInRadius = async (req, res, next) => {
  try {
    //get params
    const { zipcode, distance } = req.params;
    //get Longitude & Lat

    const loc = await geoCoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //cal radius
    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    res.status(200).send({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (err) {
    next(err);
  }
};
