def recommend_crop(ph, temperature, rainfall):
    # Simple rule-based logic for demonstration
    # In a real scenario, this would load a trained ML model (e.g., .pkl file)
    
    if ph < 5.5:
        return 'Tea'
    elif ph > 7.5:
        return 'Barley'
    
    if rainfall > 200:
        return 'Rice'
    elif rainfall < 50:
        return 'Wheat'
    
    if temperature > 30:
        return 'Maize'
    elif temperature < 15:
        return 'Potato'
        
    return 'Soybean'
