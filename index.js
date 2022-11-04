// require
const express = require('express');
const cors = require('cors');

// mongoose helps to connects to mongodb
const mongoose = require('mongoose');

require('dotenv').config();

// create expresss server
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

const uri = process.env.DB;

// URI get from mongodb dahsboard
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
// router files 
const exercisesRouter = require('./routes/exercises');
const foodeatenRouter = require('./routes/foodeaten');
const usersRouter = require('./routes/users');
const authRouter = require("./routes/auth")
const exerCaloriesRouter = require("./routes/exercisecalories")
const feaCaloriesRouter = require("./routes/foodeatencalories")
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/foodeaten', foodeatenRouter);
app.use("/auth", authRouter);
app.use("/exercise-calories", exerCaloriesRouter);
app.use("/foodeaten-calories", feaCaloriesRouter);
// server running 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
