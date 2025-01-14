const db = require('../config/db');

class File {
    static async create(filename, url, user_id) {
        const id = require('crypto').randomUUID(); // Generate UUID
        const [result] = await db.execute(
            'INSERT INTO files (id, filename, url, user_id) VALUES (?, ?, ?, ?)',
            [id, filename, url, user_id]
        );
        return id;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM files WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUser(user_id) {
        const [rows] = await db.execute('SELECT * FROM files WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async delete(id) {
        await db.execute('DELETE FROM files WHERE id = ?', [id]);
    }
}

module.exports = File;