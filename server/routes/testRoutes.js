const router = require('express').Router();
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validateMiddleware');
const {testValidationSchema} = require('../validations/testValidation')

router.get('/', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

router.post('/', (req, res) => {
    res.json({ receivedData: req.body });
});

router.post('/upload', upload.single('imageUrl'), validate(testValidationSchema), (req, res) => {
    console.log(req.file); // uploaded file info
    console.log(req.body); // other form data
    res.send("File uploaded successfully!");
});


module.exports = router 