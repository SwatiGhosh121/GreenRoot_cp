const { SoilData, Farm } = require('./../utils/prisma.js');

exports.addSoilData = async (req, res) => {
    try {
        const { farm_id, ph, temperature, rainfall } = req.body;

        // Verify farm belongs to user
        const farm = await Farm.findFirst({ where: { id: farm_id, userId: req.user.id } });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });

        const soilData = await SoilData.create({ data: {
            farmId: farm_id,
            ph,
            temperature,
            rainfall,
        }});

        res.status(201).json(soilData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getSoilDataByFarm = async (req, res) => {
    try {
        const { farmId } = req.params;

        // Verify farm belongs to user
        const farm = await Farm.findFirst({ where: { id: farmId, userId: req.user.id } });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });

        const soilData = await SoilData.findMany({ where: { farmId: farmId } });
        res.json(soilData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
