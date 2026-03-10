import userModel from "../models/userModel.js";

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.render("users/index", { users });
};

const addUser = async (req, res) => {
  const user = req.body;
  await userModel.create(user);
  res.redirect("/users");
};

const addUserForm = async (req, res) => {
  res.render("users/add");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.redirect("/users");
};

const editUserForm = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.render("users/edit", { user });
};

const saveUser = async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndUpdate(id, req.body);
  res.redirect("/users");
};

export {
  getUsers,
  addUser,
  addUserForm,
  deleteUser,
  editUserForm,
  saveUser
};