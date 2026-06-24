const express = require('express');
const router = express.Router();
const { getAllChildren, addChild, updateChild, deleteChild } = require('../controllers/childrenController');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route to get all children
router.get('/', getAllChildren);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), addChild);
router.put('/:id', authenticateToken, upload.single('image'), updateChild);
router.delete('/:id', authenticateToken, deleteChild);

module.exports = router;
