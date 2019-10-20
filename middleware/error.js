const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = error.message;
  //console.log(err.name);
  //Mongoose castError
  if (err.name == "CastError") {
    const message = `Resource with the Id of ${err.value} not found`;
    error = new ErrorResponse(message, 404)
  }
  res
    .status(error.statusCode || 500)
    .send({ success: false, error: error.message || "Server Error" });
};

//export
module.exports = errorHandler;
