require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/todo.route");

/* VARIABLES */
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

/* EXPRESS APP */
const app = express();

/* MIDDLEWARES */
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

/* TEST API */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Daily DO Server" });
});

/* BYPASS API */
app.use("/api/todos", todoRoutes);

/* DATABASE */
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
