const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        const { title, content, cover_image } = req.body;
        const author_id = req.userId; // From auth middleware
        const postId = await Post.create(title, content, cover_image, author_id);
        res.status(201).json({ id: postId, title, content, cover_image });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, cover_image } = req.body;
        await Post.update(postId, title, content, cover_image);
        res.json({ id: postId, title, content, cover_image });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.delete(postId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const author_id = req.userId; // From auth middleware
        const posts = await Post.findByAuthor(author_id);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user posts', error: error.message });
    }
};