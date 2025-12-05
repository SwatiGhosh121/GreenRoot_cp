const express = require('express');
const router = express.Router();
const { signup, login, updateProfile ,deleteAccount} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);

router.put('/update', authMiddleware, updateProfile);
router.delete('/delete', authMiddleware, deleteAccount);

module.exports = router;
