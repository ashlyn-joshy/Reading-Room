const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

//routers
const badgeRouter = require("./routers/Badge");
const subCategoryRouter = require("./routers/SubCategory");
const mainCategoryRouter = require("./routers/MainCategory");
const bookRouter = require("./routers/book");
const userRouter = require("./routers/user");

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} :  ${req.path}`);
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({
    message:
      "Hello World! This is a backend server for Reading Room application.",
  });
});
app.use("/api/badges", badgeRouter);
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/maincategories", mainCategoryRouter);
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

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
