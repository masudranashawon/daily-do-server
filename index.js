require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.route");
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
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/* TEST API */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Daily DO Server" });
});

/* BYPASS API */
app.use("/api/users", userRoutes);
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
