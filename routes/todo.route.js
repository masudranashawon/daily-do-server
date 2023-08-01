const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo.controller");

//Router
const router = express.Router();

//GET all todos
router.get("/", getAllTodos);

//Create a new todo
router.post("/", createTodo);

//DELETE a todo
router.delete("/:id", deleteTodo);

//UPDATE a todo
router.put("/:id", updateTodo);

module.exports = router;
