const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT)");
    db.run(`CREATE TABLE courses (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        subject_area TEXT,
        credits INTEGER,
        teacherId INTEGER,
        FOREIGN KEY(teacherId) REFERENCES teachers(id)
    )`);
});

module.exports = db;