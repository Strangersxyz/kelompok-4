import db from '../config/database.js';

// Chat Sessions
export async function createChatSession({ userId, characterId }) {
    const [result] = await db.execute(
        'INSERT INTO chat_sessions (user_id, character_id) VALUES (?, ?)', 
        [userId, characterId]
    );
    return result.insertId;
}

export async function getChatSessionById(sessionId) {
    const [rows] = await db.execute('SELECT * FROM chat_sessions WHERE id = ?', [sessionId]);
    return rows[0];
}

export async function getChatSessionsByUserId(userId) {
    const [rows] = await db.execute(`
        SELECT cs.*, c.name as character_name, c.avatar_url as character_avatar 
        FROM chat_sessions cs 
        JOIN characters c ON cs.character_id = c.id 
        WHERE cs.user_id = ? 
        ORDER BY cs.updated_at DESC
    `, [userId]);
    return rows;
}

export async function updateChatSessionTimestamp(sessionId) {
    const [result] = await db.execute(
        'UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
        [sessionId]
    );
    return result.affectedRows > 0;
}

export async function deleteChatSession(sessionId) {
    const [result] = await db.execute('DELETE FROM chat_sessions WHERE id = ?', [sessionId]);
    return result.affectedRows > 0;
}

// Messages
export async function saveMessage({ chatSessionId, sender, message }) {
    const [result] = await db.execute(
        'INSERT INTO messages (chat_session_id, sender, message) VALUES (?, ?, ?)', 
        [chatSessionId, sender, message]
    );
    
    // Update chat session timestamp
    await updateChatSessionTimestamp(chatSessionId);
    
    return result.insertId;
}

export async function getMessagesBySessionId(sessionId) {
    const [rows] = await db.execute(
        'SELECT * FROM messages WHERE chat_session_id = ? ORDER BY created_at ASC', 
        [sessionId]
    );
    return rows;
}

export async function updateMessage(messageId, { message, editedMessage }) {
    const fields = [];
    const values = [];
    
    if (message) {
        fields.push('message = ?');
        values.push(message);
    }
    if (editedMessage !== undefined) {
        fields.push('edited_message = ?');
        values.push(editedMessage);
    }
    
    if (fields.length === 0) return false;
    
    values.push(messageId);
    const [result] = await db.execute(
        `UPDATE messages SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}

export async function toggleMessageFavorite(messageId) {
    const [result] = await db.execute(
        'UPDATE messages SET is_favorite = NOT is_favorite WHERE id = ?', 
        [messageId]
    );
    return result.affectedRows > 0;
}

export async function deleteMessage(messageId) {
    const [result] = await db.execute('DELETE FROM messages WHERE id = ?', [messageId]);
    return result.affectedRows > 0;
}

export async function getFavoriteMessages(userId) {
    const [rows] = await db.execute(`
        SELECT m.*, cs.user_id, c.name as character_name 
        FROM messages m 
        JOIN chat_sessions cs ON m.chat_session_id = cs.id 
        JOIN characters c ON cs.character_id = c.id 
        WHERE cs.user_id = ? AND m.is_favorite = 1 
        ORDER BY m.created_at DESC
    `, [userId]);
    return rows;
}