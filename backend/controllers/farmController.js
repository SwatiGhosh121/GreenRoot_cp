const { Farm, SoilData } = require('../models');

exports.createFarm = async (req, res) => {
    try {
        const { farm_name, location, size_acres } = req.body;
        const farm = await Farm.create({
            user_id: req.user.id,
            farm_name,
            location,
            size_acres,
        });
        res.status(201).json(farm);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getFarms = async (req, res) => {
    try {
        const farms = await Farm.findAll({ where: { user_id: req.user.id } });
        res.json(farms);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getFarmById = async (req, res) => {
    try {
        const farm = await Farm.findOne({
            where: { id: req.params.id, user_id: req.user.id },
            include: [SoilData]
        });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });
        res.json(farm);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateFarm = async (req, res) => {
    try {
        const { farm_name, location, size_acres } = req.body;
        const farm = await Farm.findOne({ where: { id: req.params.id, user_id: req.user.id } });

        if (!farm) return res.status(404).json({ message: 'Farm not found' });

        farm.farm_name = farm_name || farm.farm_name;
        farm.location = location || farm.location;
        farm.size_acres = size_acres || farm.size_acres;

        await farm.save();
        res.json(farm);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteFarm = async (req, res) => {
    try {
        const farm = await Farm.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });

        await farm.destroy();
        res.json({ message: 'Farm deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
