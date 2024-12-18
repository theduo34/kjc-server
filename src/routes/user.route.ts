import express from 'express'
import {readUser, readUsers} from "../controllers/user/user.controller";

const router = express.Router()

router.get('/', readUsers)
router.get('/:id', readUser)

export default router