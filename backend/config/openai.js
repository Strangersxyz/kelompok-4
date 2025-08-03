import { openai } from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});

export default openai;