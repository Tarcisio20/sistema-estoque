import { Router } from "express";
import * as categoryController from '../controllers/category.controller'

const router = Router()

// POST /api/category / Cria uma nova categoria
router.post('/', categoryController.createCategory)
// GET /api/categories / Listar todas as categorias
router.get('/', categoryController.listCategories)

export default router