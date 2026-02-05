import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório!').max(255),
    email: z.email('Formato do e-mail incorreto!'),
    password: z.string().min(6, 'Senha deve ter no minino 6 caracteres!').max(255)
})

export const listUsersSchema = z.object({
    offset: z.coerce.number().int().min(0).optional().default(0),
    limit: z.coerce.number().int().min(1).optional().default(10)
})

export const getUserByIdSchema = z.object({
    id: z.uuid('Formato de id incorreto!')
})

export const updateUserSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório!').max(255).optional(),
    email: z.email('Formato do e-mail incorreto!').optional(),
    password: z.string().min(6, 'Senha deve ter no minino 6 caracteres!').max(255).optional(),
    isAdmin: z.boolean().optional(),
    avatar: z.string().nullable().optional()
})