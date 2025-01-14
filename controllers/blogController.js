const Blog = require('../models/blogModel');

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;
        const blogId = await Blog.create(title, content, userId);
        res.status(201).json({ id: blogId, title, content });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog' });
    }
};

exports.getBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;
        await Blog.update(blogId, title, content);
        res.json({ id: blogId, title, content });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        await Blog.delete(blogId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog' });
    }
};

exports.getUserBlogs = async (req, res) => {
    try {
        const userId = req.userId;
        const blogs = await Blog.findByUser(userId);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user blogs' });
    }
};