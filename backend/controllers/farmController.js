const { Farm, SoilData } = require('./../utils/prisma.js');

exports.createFarm = async (req, res) => {
    try {
        const { farm_name, location, size_acres } = req.body;

        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const size = size_acres !== undefined ? parseFloat(size_acres) : null;

        const farm = await Farm.create({ data: {
            farm_name,
            location,
            size_acres: size,
            userId: req.user.id,
        }});
        res.status(201).json(farm);
    } catch (error) {
        console.error('createFarm error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getFarms = async (req, res) => {
    try {
        const farms = await Farm.findMany({ where: { userId: req.user.id } });
        res.json(farms);
    } catch (error) {
        console.error('getFarms error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getFarmById = async (req, res) => {
    try {
        const farm = await Farm.findFirst({
            where: { id: req.params.id, userId: req.user.id },
            include: { soilData: true }
        });
        if (!farm) return res.status(404).json({ message: 'Farm not found' });
        res.json(farm);
    } catch (error) {
        console.error('getFarmById error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateFarm = async (req, res) => {
    try {
        const { farm_name, location, size_acres } = req.body;
        const existing = await Farm.findFirst({ where: { id: req.params.id, userId: req.user.id } });

        if (!existing) return res.status(404).json({ message: 'Farm not found' });

        const farm = await Farm.update({
            where: { id: req.params.id },
            data: {
                farm_name: farm_name ?? existing.farm_name,
                location: location ?? existing.location,
                size_acres: size_acres !== undefined ? parseFloat(size_acres) : existing.size_acres,
            }
        });
        res.json(farm);
    } catch (error) {
        console.error('updateFarm error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteFarm = async (req, res) => {
    try {
        const existing = await Farm.findFirst({ where: { id: req.params.id, userId: req.user.id } });
        if (!existing) return res.status(404).json({ message: 'Farm not found' });

        await Farm.delete({ where: { id: req.params.id } });
        res.json({ message: 'Farm deleted' });
    } catch (error) {
        console.error('deleteFarm error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
