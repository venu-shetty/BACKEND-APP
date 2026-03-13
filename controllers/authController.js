import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Render login page
const login = async (req, res) => {
  res.render("auth/login");
};

// Validate admin user (server-side login)
const validateUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, role: "admin" });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.redirect("/auth/login");
    }
  } else {
    res.redirect("/auth/login");
  }
};

// Render registration page
const register = async (req, res) => {
  res.render("auth/register");
};

// Register user (server-side rendering)
const registerUser = async (req, res) => {
  try {
    const body = req.body;

    // Check if email already exists
    const existingUser = await userModel.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    await userModel.create(body);
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Signup API (JSON)
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Signin API
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Wrong password
      return res.status(401).json({ error: "Invalid password" });
    }
    // Successful login
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// Logout
const logout = (req, res) => {
  req.session.destroy();
  res.locals.user = null;
  res.render("auth/login");
};

export { login, validateUser, register, registerUser, logout, signup, signin };