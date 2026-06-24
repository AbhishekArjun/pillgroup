const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.get("SELECT * FROM admins WHERE email = ?", [email], async (err, admin) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};

module.exports = { login };
