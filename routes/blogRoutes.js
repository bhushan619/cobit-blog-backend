const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.put('/:id', authMiddleware.authenticate, blogController.updateBlog);
router.delete('/:id', authMiddleware.authenticate, blogController.deleteBlog);
router.get('/user/blogs', authMiddleware.authenticate, blogController.getUserBlogs);

module.exports = router;