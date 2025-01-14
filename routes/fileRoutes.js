const express = require('express');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, fileController.uploadFile);
router.get('/:id', fileController.getFile);
router.get('/user/files', authMiddleware.authenticate, fileController.getUserFiles);
router.delete('/:id', authMiddleware.authenticate, fileController.deleteFile);

module.exports = router;