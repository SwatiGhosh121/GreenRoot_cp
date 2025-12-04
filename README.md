<<<<<<< HEAD
GreenRoot - AI-Powered Crop Recommendation System

An intelligent farm management system that provides AI-powered crop recommendations based on soil conditions, weather data, and farm parameters.
🌟 Features
=======
<<<<<<< HEAD
# GreenRoot_cp
GreenRoot – An AI-Powered Crop Recommendation System for Farmers
=======
# GreenRoot - AI-Powered Crop Recommendation System

An intelligent farm management system that provides AI-powered crop recommendations based on soil conditions, weather data, and farm parameters.

## 🌟 Features
>>>>>>> fix-auth

- **User Authentication**: Secure signup and login with JWT
- **Farm Management**: Add, view, and manage multiple farms
- **Soil Data Tracking**: Record and monitor soil parameters
- **AI Crop Recommendations**: Get intelligent crop suggestions based on pH, temperature, and rainfall
- **Weather Integration**: Track weather conditions for better farm management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

<<<<<<< HEAD
🏗️ Architecture

=======
## 🏗️ Architecture

```
>>>>>>> fix-auth
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
<<<<<<< HEAD
🛠️ Tech Stack
 Frontend
=======
```

## 🛠️ Tech Stack

### Frontend
>>>>>>> fix-auth
- React 18
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide Icons

<<<<<<< HEAD
Backend
=======
### Backend
>>>>>>> fix-auth
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt

<<<<<<< HEAD
AI Service
=======
### AI Service
>>>>>>> fix-auth
- Python 3.11
- Flask
- Scikit-learn
- Pandas
- NumPy

<<<<<<< HEAD

API Documentation

 Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

 Farms
=======
## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js >= 18.0.0
- Python >= 3.11
- MySQL >= 8.0
- npm >= 9.0.0

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/greenroot.git
cd greenroot
```

### 2. Setup Database
```sql
CREATE DATABASE greenroot;
```

### 3. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### 4. Setup AI Service
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 5. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 6. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5002
- AI Service: http://localhost:5001

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy with Docker
```bash
# Copy environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Start all services
docker-compose up -d
```

### Deploy to Render (Recommended)
1. Push code to GitHub
2. Create a Render account
3. Follow the step-by-step guide in [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=greenroot
JWT_SECRET=your_jwt_secret
PORT=5002
AI_SERVICE_URL=http://localhost:5001/predict
ALLOWED_ORIGINS=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5002/api
```

## 🧪 Testing

### Test Backend
```bash
cd backend
node test_signup.js
```

### Test API Endpoints
```bash
# Signup
curl -X POST http://localhost:5002/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Farms
>>>>>>> fix-auth
- `GET /api/farms` - Get all farms (authenticated)
- `POST /api/farms` - Create farm (authenticated)
- `GET /api/farms/:id` - Get farm details (authenticated)
- `PUT /api/farms/:id` - Update farm (authenticated)
- `DELETE /api/farms/:id` - Delete farm (authenticated)

<<<<<<< HEAD
 Soil Data
- `GET /api/soil/:farmId` - Get soil data for farm
- `POST /api/soil` - Add soil data

Weather
- `GET /api/weather/:location` - Get weather data

Recommendations
=======
### Soil Data
- `GET /api/soil/:farmId` - Get soil data for farm
- `POST /api/soil` - Add soil data

### Weather
- `GET /api/weather/:location` - Get weather data

### Recommendations
>>>>>>> fix-auth
- `POST /api/recommend` - Get crop recommendation
  ```json
  {
    "ph": 6.5,
    "temperature": 25,
    "rainfall": 150
  }
  ```
<<<<<<< HEAD
=======

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- OpenWeather API for weather data
- Scikit-learn for ML capabilities
- React and Vite communities

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ by GreenRoot Team
>>>>>>> 8898271 (Initial commit)
>>>>>>> fix-auth
