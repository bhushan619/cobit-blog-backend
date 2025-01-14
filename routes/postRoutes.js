const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, postController.createPost);
router.get('/:id', postController.getPost);
router.put('/:id', authMiddleware.authenticate, postController.updatePost);
router.delete('/:id', authMiddleware.authenticate, postController.deletePost);
router.get('/user/posts', authMiddleware.authenticate, postController.getUserPosts);

module.exports = router;