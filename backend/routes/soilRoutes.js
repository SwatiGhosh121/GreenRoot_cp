const express = require('express');
const router = express.Router();
const { addSoilData, getSoilDataByFarm } = require('../controllers/soilController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addSoilData);
router.get('/farm/:farmId', auth, getSoilDataByFarm);

module.exports = router;
