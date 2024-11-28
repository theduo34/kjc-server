import express = require("express");
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../../controllers/user/create-user.controller";
const userRoutes = express.Router();

userRoutes.post('/register', createUser);
userRoutes.put('/update/:id', updateUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.delete('/delete/:id', deleteUser);

export default userRoutes;