const db = require('../config/db');

class Blog {
    static async create(title, content, userId) {
        const [result] = await db.execute(
            'INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)',
            [title, content, userId]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, title, content) {
        await db.execute(
            'UPDATE blogs SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM blogs WHERE id = ?', [id]);
    }

    static async findByUser(userId) {
        const [rows] = await db.execute('SELECT * FROM blogs WHERE user_id = ?', [userId]);
        return rows;
    }
}

module.exports = Blog;