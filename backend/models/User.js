import db from '../config/database.js';

export async function findUserById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

export async function findUserByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

export async function createUser({ name, email, password }) {
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, password]
    );
    return result.insertId;
}

export async function updateUser(id, { name, email, password }) {
    const fields = [];
    const values = [];
    
    if (name) {
        fields.push('name = ?');
        values.push(name);
    }
    if (email) {
        fields.push('email = ?');
        values.push(email);
    }
    if (password) {
        fields.push('password = ?');
        values.push(password);
    }
    
    if (fields.length === 0) return false;
    
    values.push(id);
    const [result] = await db.execute(
        `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}

export async function deleteUser(id) {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
}