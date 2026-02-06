import fs from "fs/promises"
import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"
import { file } from "zod"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const AVATAR_SIZE = 50
const AVATAR_DIR = path.join(__dirname, '../../public/avatars')

export const saveAvatar = async (fileBuffer: Buffer, originalName: string) => {
    await fs.mkdir(AVATAR_DIR, { recursive: true });

    const ext = path.extname(originalName);
    const fileName = `avatar-${Date.now()}${ext}`
    const filePath = path.join(AVATAR_DIR, fileName)

    await sharp(fileBuffer)
        .resize(AVATAR_SIZE, AVATAR_SIZE, {
            fit: 'cover',
            position: 'center'
        })
        .toFile(filePath)

    return fileName
}

export const deleteAvatar = async (fileName: string) => {
    if (!fileName) return
    const filePath = path.join(AVATAR_DIR, fileName)
    await fs.unlink(filePath)
}