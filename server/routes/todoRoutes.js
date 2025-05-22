import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// POST new todo
router.post('/', async (req, res) => {
  try {
    if (!req.body.text?.trim()) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const todo = new Todo({ text: req.body.text.trim() });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create todo' });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text.trim() },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

export default router;
