const express = require('express');
const router = express.Router();
const { createFarm, getFarms, getFarmById, updateFarm, deleteFarm } = require('../controllers/farmController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createFarm);
router.get('/', auth, getFarms);
router.get('/:id', auth, getFarmById);
router.put('/:id', auth, updateFarm);
router.delete('/:id', auth, deleteFarm);

module.exports = router;
