const { SoilData, Farm } = require('../models');

exports.addSoilData = async (req, res) => {
    try {
        const { farm_id, ph, temperature, rainfall } = req.body;

        // Verify farm belongs to user
        const farm = await Farm.findOne({ where: { id: farm_id, user_id: req.user.id } });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });

        const soilData = await SoilData.create({
            farm_id,
            ph,
            temperature,
            rainfall,
        });

        res.status(201).json(soilData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getSoilDataByFarm = async (req, res) => {
    try {
        const { farmId } = req.params;

        // Verify farm belongs to user
        const farm = await Farm.findOne({ where: { id: farmId, user_id: req.user.id } });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });

        const soilData = await SoilData.findAll({ where: { farm_id: farmId } });
        res.json(soilData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
