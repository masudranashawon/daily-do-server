const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

//GET all todos
const getAllTodos = async (req, res) => {
  try {
    const user_id = req.user._id;
    const todo = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const user_id = req.user._id;

    // Check if the title is empty
    if (!title) {
      return res.status(400).json({ error: "Title cannot be blank" });
    }

    const todo = await Todo.create({
      ...req.body,
      user_id,
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ messege: "Invalid todo id" });
    }

    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      return res.status(400).json({ messege: "No todo found!" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE a todo
const updateTodo = async (req, res) => {
  try {
    const { title, status } = req.body;
    const { id } = req.params;

    // Check if the title is empty
    if (!title) {
      return res.status(400).json({ error: "Title cannot be blank" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ messege: "Invalid todo id" });
    }

    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!todo) {
      return res.status(400).json({ messege: "No todo found!" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
