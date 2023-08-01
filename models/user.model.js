const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Signup
userSchema.statics.signup = async function (name, email, password) {
  //Blank Checking
  if (!name || !email || !password) {
    throw new Error("All field is required and cannot be empty!");
  }

  //Check if email is not valid
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email!");
  }

  //Lowercase, Uppercase, Number, Symbol,8+ Chars
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  // If email exist
  const exist = await this.findOne({ email });

  if (exist) {
    throw new Error("Email alrady used!");
  }

  //Encrypt password or Hashing
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  //Create user
  const user = await this.create({
    name,
    email,
    password: hashPass,
  });

  return user;
};

// Login
userSchema.statics.login = async function (email, password) {
  //Blank Checking
  if (!email || !password) {
    throw new Error("All field is required and cannot be empty!");
  }

  // User finding
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or Password!");
  }

  // Password matching
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email or Password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
