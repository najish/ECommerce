const multer = require('multer')
const path = require('path')

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Create this folder manually or check if exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

// Filter for image only
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true)
  } else {
    cb(new Error('Only images are allowed'))
  }
}

const upload = multer({ storage, fileFilter })

module.exports = upload
