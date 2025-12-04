// --- Functionality to replace the Python service logic ---

/**
 * Recommends a crop based on environmental factors using simple rule-based logic.
 * @param {number} ph Soil pH level.
 * @param {number} temperature Ambient temperature in degrees Celsius.
 * @param {number} rainfall Annual rainfall in mm.
 * @returns {string} Recommended crop name.
 */
const recommendCrop = (ph, temperature, rainfall) => {
  // Simple rule-based logic for demonstration
  // In a real scenario, you might translate a trained ML model's logic or use a library.
  if (ph < 5.5) {
    return 'Tea';
  } else if (ph > 7.5) {
    return 'Barley';
  }

  // Note: the original Python logic had sequential if/elif blocks without
  // an explicit 'else' for the first block, meaning rainfall checks
  // only happened if pH was between 5.5 and 7.5 (inclusive of 7.5 due to flow).
  // We maintain that behavior here.
  if (rainfall > 200) {
    return 'Rice';
  } else if (rainfall < 50) {
    return 'Wheat';
  }

  if (temperature > 30) {
    return 'Maize';
  } else if (temperature < 15) {
    return 'Potato';
  }

  return 'Soybean';
};

// --- Your main backend function (e.g., in a separate module like recommendationService.js) ---

/**
 * Gets a crop recommendation without a network call.
 * @param {number} ph 
 * @param {number} temperature 
 * @param {number} rainfall 
 * @returns {object} An object containing the recommended crop.
 */
exports.getRecommendation = async (ph, temperature, rainfall) => {
  try {
    // Direct function call instead of network request
    const prediction = recommendCrop(ph, temperature, rainfall);
    
    // Return data in the same format as the original Python service response
    return { crop: prediction }; 
    
  } catch (error) {
    // Handle potential errors within the synchronous function call
    console.error('Error in getRecommendation logic:', error.message);
    throw new Error('Failed to get crop recommendation');
  }
};

// --- Example of how to use it in your main application logic (e.g., an Express route handler) ---

/*
// Assuming you are using an Express-like framework:
app.post('/api/recommend', async (req, res) => {
  const { ph, temperature, rainfall } = req.body;
  
  if (ph === undefined || temperature === undefined || rainfall === undefined) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const recommendationResult = await exports.getRecommendation(ph, temperature, rainfall);
    res.json(recommendationResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/
