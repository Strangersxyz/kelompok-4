import db from '../config/database.js';

export async function getUserSettings(userId) {
    const [rows] = await db.execute('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
    return rows[0];
}

export async function createUserSettings(userId, { temperature = 0.7, topP = 1, style = 'default' } = {}) {
    const [result] = await db.execute(
        'INSERT INTO user_settings (user_id, temperature, top_p, style) VALUES (?, ?, ?, ?)', 
        [userId, temperature, topP, style]
    );
    return result.insertId;
}

export async function updateUserSettings(userId, { temperature, topP, style }) {
    const fields = [];
    const values = [];
    
    if (temperature !== undefined) {
        fields.push('temperature = ?');
        values.push(temperature);
    }
    if (topP !== undefined) {
        fields.push('top_p = ?');
        values.push(topP);
    }
    if (style !== undefined) {
        fields.push('style = ?');
        values.push(style);
    }
    
    if (fields.length === 0) return false;
    
    values.push(userId);
    
    // Try to update first
    const [updateResult] = await db.execute(
        `UPDATE user_settings SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`,
        values
    );
    
    // If no rows affected, create new settings
    if (updateResult.affectedRows === 0) {
        const settingsData = { temperature, topP, style };
        return await createUserSettings(userId, settingsData);
    }
    
    return true;
}

export async function deleteUserSettings(userId) {
    const [result] = await db.execute('DELETE FROM user_settings WHERE user_id = ?', [userId]);
    return result.affectedRows > 0;
}

export async function getUserSettingsOrDefault(userId) {
    let settings = await getUserSettings(userId);
    
    if (!settings) {
        // Create default settings if none exist
        await createUserSettings(userId);
        settings = await getUserSettings(userId);
    }
    
    return settings;
}