const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send(
    "Hello World! This is a backend server for Reading Room application."
  );
  next();
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log("Connected to MongoDB");
    },
    (err) => {
      console.log("Error connecting to MongoDB:", err);
    }
  );
});
