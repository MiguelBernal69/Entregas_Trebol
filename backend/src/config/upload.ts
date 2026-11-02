import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Crear carpeta si no existe
const uploadDir = 'uploads/clients'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `client-${unique}${ext}`)
  }
})

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imágenes JPG, PNG o WEBP'))
  }
}

export const uploadClientPhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
})