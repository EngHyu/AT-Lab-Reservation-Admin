import multer from 'multer'
import { existsSync, mkdirSync } from 'fs'

if (!existsSync('../uploads')) {
  mkdirSync('../uploads')
}

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads")
  },
  filename: function(req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({ storage: storage }).single("file")

export default upload