const axios = require('axios');

<<<<<<< HEAD
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001/predict';
=======
const AI_SERVICE_URL = 'http://localhost:5001/predict';
>>>>>>> fix-auth

exports.getRecommendation = async (ph, temperature, rainfall) => {
    try {
        const response = await axios.post(AI_SERVICE_URL, {
            ph,
            temperature,
            rainfall,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendation:', error.message);
        throw new Error('Failed to get crop recommendation');
    }
};
