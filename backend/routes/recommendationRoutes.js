const express = require('express');
const router = express.Router();
const { recommendCrop } = require('../controllers/recommendationController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, recommendCrop);

module.exports = router;
