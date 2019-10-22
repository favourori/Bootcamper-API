const express = require("express");
app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");
const fileupload = require('express-fileupload')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(fileupload())

//load env
dotenv.config({ path: "./config/config.env" });
//Connect to DB
const connectDB = require("./config/db");
connectDB();

//Dev logging middleware - only runs when in development

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//import Routes
const bootcampsRoutes = require("./routes/bootcamps");
const courseRoutes = require("./routes/courses");

//Mount routes
app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", courseRoutes);
//error middleware
app.use(errorHandler);

//Spin up server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
  );
});

//Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //close server
  server.close(() => process.exit(1));
});
