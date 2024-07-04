const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config({ path: "./.env" });


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRouter = require("./routes/userRoutes");
const hopitalRoute = require("./routes/hospitalRoutes");
const patientRoute = require("./routes/patientRoutes");
const admitingRoute = require('./routes/AdmitingRoutes')
const reportRoute = require("./routes/ReportRoutes");


app.use("/users", userRouter);
app.use("/hospital", hopitalRoute);
app.use("/patient", patientRoute);
app.use("/admiting", admitingRoute);
app.use("/report", reportRoute)


const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });