const db = require('../config/db');

class Post {
    static async create(title, content, cover_image, author_id) {
        const id = require('crypto').randomUUID(); // Generate UUID
        const [result] = await db.execute(
            'INSERT INTO posts (id, title, content, cover_image, author_id) VALUES (?, ?, ?, ?, ?)',
            [id, title, content, cover_image, author_id]
        );
        return id;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, title, content, cover_image) {
        await db.execute(
            'UPDATE posts SET title = ?, content = ?, cover_image = ? WHERE id = ?',
            [title, content, cover_image, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM posts WHERE id = ?', [id]);
    }

    static async findByAuthor(author_id) {
        const [rows] = await db.execute('SELECT * FROM posts WHERE author_id = ?', [author_id]);
        return rows;
    }
}

module.exports = Post;