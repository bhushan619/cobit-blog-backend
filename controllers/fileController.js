const File = require('../models/fileModel');

exports.uploadFile = async (req, res) => {
    try {
        const { filename, url } = req.body;
        const user_id = req.userId; // From auth middleware
        const fileId = await File.create(filename, url, user_id);
        res.status(201).json({ id: fileId, filename, url });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
};

exports.getFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json(file);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching file', error: error.message });
    }
};

exports.getUserFiles = async (req, res) => {
    try {
        const user_id = req.userId; // From auth middleware
        const files = await File.findByUser(user_id);
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user files', error: error.message });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        await File.delete(fileId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
};