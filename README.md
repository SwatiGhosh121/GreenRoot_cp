GreenRoot - AI-Powered Crop Recommendation System

An intelligent farm management system that provides AI-powered crop recommendations based on soil conditions, weather data, and farm parameters.
🌟 Features

- **User Authentication**: Secure signup and login with JWT
- **Farm Management**: Add, view, and manage multiple farms
- **Soil Data Tracking**: Record and monitor soil parameters
- **AI Crop Recommendations**: Get intelligent crop suggestions based on pH, temperature, and rainfall
- **Weather Integration**: Track weather conditions for better farm management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

🏗️ Architecture

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  AI Service │
│  (React)    │     │  (Node.js)  │     │  (Python)   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Database  │
                    │   (MySQL)   │
                    └─────────────┘
🛠️ Tech Stack
 Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide Icons

Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt

AI Service
- Python 3.11
- Flask
- Scikit-learn
- Pandas
- NumPy


API Documentation

 Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

 Farms
- `GET /api/farms` - Get all farms (authenticated)
- `POST /api/farms` - Create farm (authenticated)
- `GET /api/farms/:id` - Get farm details (authenticated)
- `PUT /api/farms/:id` - Update farm (authenticated)
- `DELETE /api/farms/:id` - Delete farm (authenticated)

 Soil Data
- `GET /api/soil/:farmId` - Get soil data for farm
- `POST /api/soil` - Add soil data

Weather
- `GET /api/weather/:location` - Get weather data

Recommendations
- `POST /api/recommend` - Get crop recommendation
  ```json
  {
    "ph": 6.5,
    "temperature": 25,
    "rainfall": 150
  }
  ```
