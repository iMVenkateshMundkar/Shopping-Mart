const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register controller
const RegisterUser = async (req, res) => {
  try {
    const { email, password, passwordCheck, name, username, mobile } = req.body;
    // Validate
    // Status code 400 means bad request
    // Status code 500 means internal server error
    if (
      !email ||
      !password ||
      !passwordCheck ||
      !name ||
      !username ||
      !mobile
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    // Checking to ensure password length is at least 8 characters
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The passowrd needs to be at least 8 characters long" });
    }
    // Checking the password vs the password checker
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Passwords do not match. PLease try again." });
    }
    // Checking database and running an email check to ensure no duplicate emails upon register
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }
    // Using Bcrypt to hash password for security
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // Creating out new user notice password value is passwordHash not passowrd
    const newUser = new User({
      email: email,
      password: passwordHash,
      name: name,
      username: username,
      mobile: mobile,
    });
    const user = await newUser.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// Login controller
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all field have been entered." });
    }

    // Checking email that was entered and comparing email in our database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    // Checking password enterd and comparing hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // Creating our json web token by passing the user id and our JWT_SECRET
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
};

const UpdateUser = async (req, res) => {
  console.log(req);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      req.body.newUser
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// Delete controller
const DeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// Token validator controller
const TokenValidator = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  UpdateUser,
  DeleteUser,
  TokenValidator,
};
