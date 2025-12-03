const aiService = require('../services/aiService');

exports.recommendCrop = async (req, res) => {
    try {
        const { ph, temperature, rainfall } = req.body;

        if (ph === undefined || temperature === undefined || rainfall === undefined) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        const recommendation = await aiService.getRecommendation(ph, temperature, rainfall);
        res.json(recommendation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
