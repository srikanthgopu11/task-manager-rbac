// backend/controllers/taskController.js
const db = require('../models');

exports.getTasks = (req, res) => {
    const { id, role } = req.user;
    
    if (role === 'admin') {
        // Admin sees all tasks
        db.all(`SELECT tasks.*, users.username as creator FROM tasks JOIN users ON tasks.createdBy = users.id`, [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        // User sees only their tasks
        db.all(`SELECT * FROM tasks WHERE createdBy = ?`, [id], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
};

exports.createTask = (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    db.run(`INSERT INTO tasks (title, description, status, createdBy) VALUES (?, ?, ?, ?)`,
        [title, description, status || 'pending', userId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, title, description, status });
        }
    );
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    const { id, role } = req.user;

    const query = role === 'admin' 
        ? `DELETE FROM tasks WHERE id = ?` 
        : `DELETE FROM tasks WHERE id = ? AND createdBy = ?`;
    
    const params = role === 'admin' ? [taskId] : [taskId, id];

    db.run(query, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Task not found or unauthorized" });
        res.json({ message: "Task deleted" });
    });
};