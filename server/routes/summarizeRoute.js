import express from 'express';
import axios from 'axios';
import Todo from '../models/Todo.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    if (todos.length === 0) return res.json({ success: false, message: "No pending todos" });

    const todoTexts = todos.map(t => t.text).join(', ');

    const ollamaResponse = await axios.post(process.env.OLLAMA_API_URL, {
      model: process.env.OLLAMA_MODEL || 'gemma:2b',
      prompt: `Summarize this todo list in 2-3 lines, short and clear:\n${todoTexts}`,
      stream: false
    });

    const summary = ollamaResponse.data.response || "Could not summarize.";

    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *Todo Summary:*\n${summary}`
    });

    res.json({ success: true, message: "✅ Summary sent to Slack", summary });

  } catch (error) {
    console.error("❌ Error summarizing or sending to Slack:", error);
    res.status(500).json({ success: false, message: "Error during summarization or Slack send." });
  }
});

export default router;
