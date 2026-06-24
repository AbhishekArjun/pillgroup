const db = require('../config/db');

const getAllChildren = (req, res) => {
  db.all("SELECT * FROM children", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const addChild = (req, res) => {
  const { name, age, location, need, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
  const sql = "INSERT INTO children (name, age, location, need, status, imageUrl) VALUES (?, ?, ?, ?, ?, ?)";
  const params = [name, age, location, need, status || 'Awaiting Sponsor', imageUrl];
  
  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      name, age, location, need, status: status || 'Awaiting Sponsor', imageUrl
    });
  });
};

const updateChild = (req, res) => {
  const { name, age, location, need, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  let sql = `
    UPDATE children 
    SET name = COALESCE(?, name), 
        age = COALESCE(?, age), 
        location = COALESCE(?, location), 
        need = COALESCE(?, need), 
        status = COALESCE(?, status)`;
  
  const params = [name, age, location, need, status];

  if (imageUrl !== undefined) {
    sql += `, imageUrl = ?`;
    params.push(imageUrl);
  }

  sql += ` WHERE id = ?`;
  params.push(req.params.id);
  
  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Updated successfully", changes: this.changes });
  });
};

const deleteChild = (req, res) => {
  db.run("DELETE FROM children WHERE id = ?", req.params.id, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Deleted successfully", changes: this.changes });
  });
};

module.exports = {
  getAllChildren,
  addChild,
  updateChild,
  deleteChild
};
