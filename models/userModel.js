const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async create(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = require('crypto').randomUUID(); // Generate UUID
        const [result] = await db.execute(
            'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
            [id, email, hashedPassword]
        );
        return id;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async comparePassword(candidatePassword, hashedPassword) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

module.exports = User;