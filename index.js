const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }

    task.title = title;
    task.description = description;
    res.status(200).json(task);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
