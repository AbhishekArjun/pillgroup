const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create admins table
    db.run(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating admins table:', err.message);
      } else {
        // Seed default admin
        db.get("SELECT COUNT(*) AS count FROM admins", async (err, row) => {
          if (row && row.count === 0) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            db.run("INSERT INTO admins (email, password) VALUES (?, ?)", ['admin@pillgroup.com', hashedPassword]);
            console.log('Default admin seeded: admin@pillgroup.com / password123');
          }
        });
      }
    });

    // Create children table with imageUrl
    db.run(`
      CREATE TABLE IF NOT EXISTS children (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        location TEXT,
        need TEXT,
        status TEXT,
        imageUrl TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating children table:', err.message);
      } else {
        // SQLite doesn't natively support "ADD COLUMN IF NOT EXISTS". 
        // We can try to add the column, and ignore the error if it already exists.
        db.run("ALTER TABLE children ADD COLUMN imageUrl TEXT", (err) => {
          // Ignore error (column probably already exists)
        });

        // Seed default data if table is empty
        db.get("SELECT COUNT(*) AS count FROM children", (err, row) => {
          if (row && row.count === 0) {
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

module.exports = db;
