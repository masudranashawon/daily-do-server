const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

//Router
const router = express.Router();

router.use(isAuthenticated);

//GET all todos
router.get("/", getAllTodos);

//Create a new todo
router.post("/", createTodo);

//DELETE a todo
router.delete("/:id", deleteTodo);

//UPDATE a todo
router.patch("/:id", updateTodo);

module.exports = router;
