import { Router } from "express";
import * as useController from '../controllers/user.controller'


const router = Router()

// POST /api/user / Create a new user
router.post('/', useController.createUser)

export default router