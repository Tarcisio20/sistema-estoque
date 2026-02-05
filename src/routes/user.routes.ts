import { Router } from "express";
import * as useController from '../controllers/user.controller'


const router = Router()

// POST /api/user / Create a new user
router.post('/', useController.createUser)
// GET /api/users / Listar todos os usuarios
router.get('/', useController.listUsers)
// GET /api/users/:id / Pegar usuario pelo id
router.get('/:id', useController.getUser)
// DELETE /api/users/:id / Deletar usuario pelo id
router.delete('/:id', useController.deleteUser)
// PUT /api/users/:id / Atualizar usuario pelo id
router.put('/:id', useController.updateUser)


export default router