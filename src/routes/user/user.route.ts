import express = require("express");
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../../controllers/user/create-user.controller";
const routes = express.Router();

routes.post('/register', createUser);
routes.put('/update/:id', updateUser);
routes.get('/', getUsers);
routes.get('/:id', getUser);
routes.delete('/delete/:id', deleteUser);

export default routes;