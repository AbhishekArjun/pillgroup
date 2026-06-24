const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create children table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS children (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        location TEXT,
        need TEXT,
        status TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        // Seed default data if table is empty
        db.get("SELECT COUNT(*) AS count FROM children", (err, row) => {
          if (err) {
            console.error('Error checking count:', err.message);
          } else if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO children (name, age, location, need, status) VALUES (?, ?, ?, ?, ?)");
            const defaultChildren = [
              { name: "Aisha M.", age: 8, location: "Nairobi, Kenya", need: "Primary School Tuition", status: "Awaiting Sponsor" },
              { name: "Rahul S.", age: 10, location: "Mumbai, India", need: "Books & Uniform", status: "Sponsored" },
              { name: "Elena G.", age: 7, location: "Bogota, Colombia", need: "Primary School Tuition", status: "Awaiting Sponsor" },
              { name: "Samuel O.", age: 12, location: "Lagos, Nigeria", need: "High School Prep", status: "Awaiting Sponsor" },
              { name: "Mai N.", age: 9, location: "Hanoi, Vietnam", need: "After-school Program", status: "Sponsored" },
              { name: "David T.", age: 6, location: "Accra, Ghana", need: "Kindergarten Support", status: "Awaiting Sponsor" }
            ];
            
            defaultChildren.forEach(child => {
              stmt.run(child.name, child.age, child.location, child.need, child.status);
            });
            stmt.finalize();
            console.log('Database seeded with default children data.');
          }
        });
      }
    });
  }
});

// Routes
// Get all children
app.get('/api/children', (req, res) => {
  db.all("SELECT * FROM children", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new child
app.post('/api/children', (req, res) => {
  const { name, age, location, need, status } = req.body;
  const sql = "INSERT INTO children (name, age, location, need, status) VALUES (?, ?, ?, ?, ?)";
  const params = [name, age, location, need, status || 'Awaiting Sponsor'];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: this.lastID,
      name, age, location, need, status: status || 'Awaiting Sponsor'
    });
  });
});

// Update a child
app.put('/api/children/:id', (req, res) => {
  const { name, age, location, need, status } = req.body;
  const sql = `
    UPDATE children 
    SET name = COALESCE(?, name), 
        age = COALESCE(?, age), 
        location = COALESCE(?, location), 
        need = COALESCE(?, need), 
        status = COALESCE(?, status) 
    WHERE id = ?`;
  const params = [name, age, location, need, status, req.params.id];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Updated successfully", changes: this.changes });
  });
});

// Delete a child
app.delete('/api/children/:id', (req, res) => {
  db.run("DELETE FROM children WHERE id = ?", req.params.id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Deleted successfully", changes: this.changes });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
