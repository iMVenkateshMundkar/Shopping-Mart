const express = require("express");
const {
  RegisterUser,
  LoginUser,
  DeleteUser,
  TokenValidator,
  UpdateUser,
} = require("../controller/userController");
const auth = require("../middleware/auth");
const router = express.Router();

// Register User Route
router.post("/signup", RegisterUser);

// Login User Route
router.post("/login", LoginUser);

// Update User Route
router.post("/update", UpdateUser);

// Delete User Route
router.delete("/delete", auth, DeleteUser);

// Validation User Route
router.post("/tokenIsValid", TokenValidator);

module.exports = router;
