const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

//GET all todos
const getAllTodos = async (req, res) => {};

//Create a new todo
const createTodo = async (req, res) => {
  const { title } = req.body;

  // Check if the title is empty
  if (!title) {
    return res.status(400).json({ error: "Title cannot be blank" });
  }

  try {
    const todo = await Todo.create({
      title,
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a todo
const deleteTodo = async (req, res) => {};

//UPDATE a todo
const updateTodo = async (req, res) => {};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
