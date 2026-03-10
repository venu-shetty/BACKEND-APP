import express from "express";
import {
  getUsers,
  addUser,
  addUserForm,
  deleteUser,
  editUserForm,
  saveUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);               // /users
router.get("/add", addUserForm);         // display add form
router.post("/add", addUser);            // submit add
router.get("/edit/:id", editUserForm);   // display edit form
router.post("/edit/:id", saveUser);      // submit edit
router.get("/delete/:id", deleteUser);   // delete

export default router; 