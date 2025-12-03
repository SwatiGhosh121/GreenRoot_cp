const weatherService = require('../services/weatherService');

exports.getWeather = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and Longitude are required' });
        }
        const weatherData = await weatherService.getWeather(lat, lon);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
