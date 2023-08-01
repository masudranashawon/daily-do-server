const User = require("../models/user.model");

// Signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.signup(name, email, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {};

module.exports = { loginUser, signupUser };
