const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all courses
router.get('/', (req, res) => {
    db.all("SELECT * FROM courses", [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Add a new course
router.post('/', (req, res) => {
    const { name, description, subject_area, credits, teacherId } = req.body;
    db.run("INSERT INTO courses (name, description, subject_area, credits, teacherId) VALUES (?, ?, ?, ?, ?)", 
        [name, description, subject_area, credits, teacherId], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Edit a course
router.put('/:id', (req, res) => {
    const { name, description, subject_area, credits, teacherId } = req.body;
    db.run("UPDATE courses SET name = ?, description = ?, subject_area = ?, credits = ?, teacherId = ? WHERE id = ?", 
        [name, description, subject_area, credits, teacherId, req.params.id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

// Delete a course
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM courses WHERE id = ?", req.params.id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

module.exports = router;