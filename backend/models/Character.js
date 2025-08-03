import db from '../config/database.js';

export async function getCharactersByUserId(userId) {
    const [rows] = await db.execute(
        'SELECT * FROM characters WHERE user_id = ? ORDER BY created_at DESC', 
        [userId]
    );
    return rows;
}

export async function getCharacterById(id) {
    const [rows] = await db.execute('SELECT * FROM characters WHERE id = ?', [id]);
    return rows[0];
}

export async function createCharacter({ userId, name, personality, avatarUrl = null, exampleDialog = null, isNsfw = false }) {
    const [result] = await db.execute(
        'INSERT INTO characters (user_id, name, avatar_url, personality, example_dialog, is_nsfw) VALUES (?, ?, ?, ?, ?, ?)', 
        [userId, name, avatarUrl, personality, exampleDialog, isNsfw]
    );
    return result.insertId;
}

export async function updateCharacter(id, { name, personality, avatarUrl, exampleDialog, isNsfw }) {
    const fields = [];
    const values = [];
    
    if (name) {
        fields.push('name = ?');
        values.push(name);
    }
    if (personality) {
        fields.push('personality = ?');
        values.push(personality);
    }
    if (avatarUrl !== undefined) {
        fields.push('avatar_url = ?');
        values.push(avatarUrl);
    }
    if (exampleDialog !== undefined) {
        fields.push('example_dialog = ?');
        values.push(exampleDialog);
    }
    if (isNsfw !== undefined) {
        fields.push('is_nsfw = ?');
        values.push(isNsfw);
    }
    
    if (fields.length === 0) return false;
    
    values.push(id);
    const [result] = await db.execute(
        `UPDATE characters SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}

export async function deleteCharacter(id) {
    const [result] = await db.execute('DELETE FROM characters WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

export async function getCharacterWithOwner(characterId) {
    const [rows] = await db.execute(`
        SELECT c.*, u.name as owner_name, u.email as owner_email 
        FROM characters c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.id = ?
    `, [characterId]);
    return rows[0];
}