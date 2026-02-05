import { RequestHandler } from "express";
import { createUserSchema, getUserByIdSchema, listUsersSchema, updateUserSchema } from "../validators/user.validator";
import * as userService from '../services/user.service'
import { AppError } from "../utils/apperror";
import { tr } from "zod/v4/locales";

export const createUser: RequestHandler = async (req, res) => {
    const data = createUserSchema.parse(req.body)

    const user = await userService.createUser(data)

    res.status(201).json({
        error: null,
        data: user
    })
}

export const listUsers: RequestHandler = async (req, res) => {
    const { offset, limit } = listUsersSchema.parse(req.query)

    const users = await userService.listUsers(offset, limit)
    res.status(200).json({
        error: null,
        data: users
    })
}

export const getUser: RequestHandler = async (req, res) => {
    const { id } = getUserByIdSchema.parse(req.params)
    const user = await userService.getUserByIdPublic(id)
    if (!user) throw new AppError('Usuario nao encontrado', 404)
    res.status(200).json({
        error: null,
        data: user
    })
}

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = getUserByIdSchema.parse(req.params)
    const deletedUser = await userService.deleteUser(id)
    if (!deleteUser) throw new AppError('Usuario nao encontrado', 404)
    res.status(200).json({
        error: null,
        data: null
    })
}

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = getUserByIdSchema.parse(req.params)
    const data = updateUserSchema.parse(req.body)

    //TODO HANDLE AVATAR UPDATE

    const updatedUser = await userService.updateUser(id, data)
    res.status(200).json({
        error: null,
        data: updatedUser
    })
}