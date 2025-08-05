const multer = require('multer')
const path = require('path')
const fs = require('fs')

const createDynamicMulter = ({ folderName, fieldName }) => {
  const uploadPath = path.join(__dirname, `../uploads/${folderName}`)

  // Create folder if it doesn't exist
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      const uniqueName =
        Date.now() + '-' + file.originalname.replace(/\s/g, '_')
      cb(null, uniqueName)
    },
  })

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      return cb(
        new Error('Only image files are allowed (.png, .jpg, .jpeg, .webp)')
      )
    }
    cb(null, true)
  }

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB max size (optional)
    },
  })

  return upload.single(fieldName)
}

module.exports = createDynamicMulter
