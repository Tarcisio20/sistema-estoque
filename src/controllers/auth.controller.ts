import { RequestHandler } from "express";
import { authLoginSchema } from "../validators/auth.valitador";
import * as userService from '../services/user.service'
import { AppError } from "../utils/apperror";
import { error } from "console";
export const login: RequestHandler = async (req, res) => {
    const data = authLoginSchema.parse(req.body)
    const result = await userService.login(data.email, data.password);
    if (!result) throw new AppError('Credenciais invalidas!', 401)

    res.status(200).json({
        error: null,
        data: result
    })

}

export const logout: RequestHandler = async (req, res) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const [_, token] = authHeader.split(' ');
        if(token){
            await userService.logout(token);
        }
    }
    res.json({
        error: null,
        data :{
            message : 'Deslogado com sucesso!'
        }
    })
}