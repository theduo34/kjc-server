import express = require("express");
import {createUser, loginUser} from "../controllers/auth/auth.controller";
const routes = express.Router();

routes.post('/register', createUser);
routes.post('/login', loginUser);

export default routes;