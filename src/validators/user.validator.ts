import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório!').max(255),
    email: z.email('Formato do e-mail incorreto!'),
    password: z.string().min(6, 'Senha deve ter no minino 6 caracteres!').max(255)
})