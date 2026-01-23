import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { NewUser, User, users } from "../db/schema";
import  bcrypt from 'bcrypt'
import crypto from 'crypto'
import { AppError } from "../utils/apperror";

export const createUser = async (data : NewUser) => {
    // 1. Verificar se o usuario existe
    const existingUser = await getUserByEmail(data.email);    
    if(existingUser) throw new AppError('E-mail ja cadastrado!');

    // 2. Hash da senha
    const hashedPassword = await hashPassword(data.password);

    // 3. Salvar o usuario
    const newUser : NewUser = {
        ...data,
        password : hashedPassword
    }
    const result = await db.insert(users).values(newUser).returning();
    const user = result[0];
    
    // 4. Retornar o usuario
    return formatUser(user);
}

export const login = async (email : string, password : string) => {
    // 1. Verificar se o usuario existe
    const user = await getUserByEmail(email);
    if(!user) return null;

    // 2. Verificar se a senha esta correta
    const isPasswordValid = await verifyPassword(password, user.password);
    if(!isPasswordValid) return null;

    // 3. Criar Token
    const token = crypto.randomBytes(32).toString('hex');

    // 4. Atualizar o usuario
    await db.update(users).set({ token, updatedAt : new Date() }).where(eq(users.id, user.id)).returning();
    
    // 5. Retornar o usuario
    const userFormatted = formatUser(user);
    return {
        ...userFormatted,
        token
    }
}

export const logout = async (token : string) => {
    await db.update(users).set({ token : null, updatedAt : new Date() }).where(eq(users.token, token))
}

export const validateToken = async (token : string) => {
    const result = await db.select().from(users).where(eq(users.token, token)).limit(1);
    const user = result[0];
    if(!user || user.deletedAt) return null;
    return user
}

// Helppers Fuctions
export const getUserByEmail = async (email : string) => {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = result[0];

    if(!user || user.deletedAt) return null;
    return user
}

export const hashPassword = async (password : string) => {
    return bcrypt.hash(password, 10);
}

export const verifyPassword = async (password : string, hash : string) => {
    return bcrypt.compare(password, hash);
}

export const formatUser = (user : User) => {
   const { password, ...userWithoutPassword } = user;
   if(userWithoutPassword.avatar) {
    userWithoutPassword.avatar = `${process.env.BASE_URL}/static/avatars/${userWithoutPassword.avatar}`
   }
   return userWithoutPassword
}