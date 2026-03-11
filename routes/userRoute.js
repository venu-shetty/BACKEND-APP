import express from "express";
import {
  getUsers,
  addUser,
  addUserForm,
  deleteUser,
  editUserForm,
  saveUser
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);               // /users
userRouter.get("/add", addUserForm);         // display add form
userRouter.post("/add", addUser);            // submit add
userRouter.get("/edit/:id", editUserForm);   // display edit form
userRouter.post("/edit/:id", saveUser);      // submit edit
userRouter.get("/delete/:id", deleteUser);   // delete

export default userRouter; 