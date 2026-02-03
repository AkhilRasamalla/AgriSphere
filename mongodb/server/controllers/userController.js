// mongodb/server/controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");

// SIGNUP
exports.signup = async (req, res) => {
  const { username, password, email, notificationFrequency, preferredUnits } =
    req.body;

  try {
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required." });
    }

    // ✅ check email FIRST
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      preferences: {
        notificationFrequency,
        preferredUnits,
      },
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // remove password
    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// GET USER DATA
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      notificationFrequency: user.preferences?.notificationFrequency,
      preferredUnits: user.preferences?.preferredUnits,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

// UPDATE USER DATA
exports.updateUserData = async (req, res) => {
  const { username, email, notificationFrequency, preferredUnits } = req.body;

  try {
    const update = {};

    if (username) update.username = username;
    if (email) update.email = email;

    if (
      notificationFrequency !== undefined ||
      preferredUnits !== undefined
    ) {
      update.preferences = {
        notificationFrequency,
        preferredUnits,
      };
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user data" });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password" });
  }
};
