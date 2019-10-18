const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
//load env
dotenv.config({ path: "./config/config.env" });
app = express();

//Dev logging middleware - only runs when in development

if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}

//import Routes
const bootcampsRoutes = require("./routes/bootcamps");

//Mount routes
app.use("/api/v1/bootcamps", bootcampsRoutes);

//Spin up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
