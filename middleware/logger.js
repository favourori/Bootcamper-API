const logger = (req, res, next) => {
  console.log("Logger Middleware ran..");
  next();
};

module.exports = logger;
