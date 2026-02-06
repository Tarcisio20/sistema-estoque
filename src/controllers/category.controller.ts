import { RequestHandler } from "express";
import { createCategorySchema, listCategoriesSchema } from "../validators/category.validator";
import * as categoryService from '../services/category.service'
import { AppError } from "../utils/apperror";

export const createCategory: RequestHandler = async (req, res) => {
    const data = createCategorySchema.parse(req.body)
    const category = await categoryService.createCategory(data)
    if (!category) throw new AppError('Erro ao criar categoria', 404)
    res.status(201).json({ error: null, data: category })
}

export const listCategories: RequestHandler = async (req, res) => {
    const { includeProductCount } = listCategoriesSchema.parse(req.query)
    const categories = await categoryService.listCategories(includeProductCount)
    res.status(200).json({ error: null, data: categories })
}