import 'dotenv/config';
import OpenAI from 'openai';

// Inisialisasi client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Kirim pesan ke OpenAI Chat API
 * @param {Array} messages - Array pesan (format chat)
 * @param {string} model - Nama model, default 'gpt-4'
 * @param {number} temperature - Nilai temperatur, default 0.7
 * @returns {Promise<string>} - Hasil balasan dari OpenAI
 */
export async function sendMessageToOpenAI(messages, model = 'gpt-4', temperature = 0.7) {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
    });

    const response = completion.choices[0]?.message?.content || 'no response';
    return response;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Failed to communicate with OpenAI');
  }
}
