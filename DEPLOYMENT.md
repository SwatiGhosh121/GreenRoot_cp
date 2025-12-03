# GreenRoot Deployment Guide

This guide will help you deploy the GreenRoot application to production using Render (free tier available).

## Architecture Overview

The application consists of three services:
1. **Frontend** (React + Vite) - Static site
2. **Backend** (Node.js + Express) - Web service
3. **AI Service** (Python + Flask) - Web service
4. **Database** (MySQL) - Managed database

## Deployment Options

### Option 1: Render (Recommended - Free Tier Available)
### Option 2: Railway
### Option 3: Vercel (Frontend) + Render (Backend + AI)

---

## Option 1: Deploy to Render (Complete Guide)

### Prerequisites
1. GitHub account
2. Render account (sign up at https://render.com)
3. Push your code to GitHub

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
cd /Users/swatighosh/Desktop/GreenRoot_cp
git init
git add .
git commit -m "Initial commit"
```

2. **Create a GitHub repository** and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/greenroot.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy MySQL Database on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"PostgreSQL"** (MySQL not available on free tier, we'll use PostgreSQL)
   - **Alternative**: Use PlanetScale (free MySQL) or Railway
3. Configure:
   - **Name**: `greenroot-db`
   - **Database**: `greenroot`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: Free
4. Click **"Create Database"**
5. **Save the connection details** (Internal Database URL)

### Step 3: Update Backend for PostgreSQL

Since Render's free tier uses PostgreSQL instead of MySQL, we need to update the backend:

1. Update `backend/package.json` dependencies:
   - Replace `mysql2` with `pg pg-hstore`
2. Update `backend/config/db.js` to use PostgreSQL dialect

### Step 4: Deploy Backend Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `greenroot-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
4. Add Environment Variables:
   - `DATABASE_URL`: (Copy from your database's Internal Database URL)
   - `JWT_SECRET`: (Generate a random string, e.g., use: `openssl rand -base64 32`)
   - `PORT`: `10000` (Render assigns this automatically)
   - `NODE_ENV`: `production`
5. Click **"Create Web Service"**
6. **Save the service URL** (e.g., `https://greenroot-backend.onrender.com`)

### Step 5: Deploy AI Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `greenroot-ai`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `ai-service`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -b 0.0.0.0:$PORT app:app`
   - **Plan**: Free
4. Click **"Create Web Service"**
5. **Save the service URL** (e.g., `https://greenroot-ai.onrender.com`)

### Step 6: Update Backend to Use AI Service URL

1. Update `backend/services/aiService.js`:
   - Change `AI_SERVICE_URL` from `http://localhost:5001/predict` to `https://greenroot-ai.onrender.com/predict`
2. Commit and push changes

### Step 7: Deploy Frontend

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `greenroot-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_URL`: `https://greenroot-backend.onrender.com/api`
5. Click **"Create Static Site"**
6. **Your app will be live at**: `https://greenroot-frontend.onrender.com`

---

## Option 2: Deploy to Railway

Railway offers a simpler setup with MySQL support.

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### Step 2: Initialize Railway Project
```bash
cd /Users/swatighosh/Desktop/GreenRoot_cp
railway init
```

### Step 3: Add MySQL Database
```bash
railway add --database mysql
```

### Step 4: Deploy Services
```bash
# Deploy backend
cd backend
railway up

# Deploy AI service
cd ../ai-service
railway up

# Deploy frontend
cd ../frontend
railway up
```

---

## Option 3: Vercel (Frontend) + Render (Backend)

### Frontend on Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy:
```bash
cd frontend
vercel
```

### Backend on Render
Follow Steps 2-6 from Option 1

---

## Environment Variables Summary

### Backend (.env)
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5002
NODE_ENV=production
AI_SERVICE_URL=https://your-ai-service-url.onrender.com
```

### Frontend (Build time)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Post-Deployment Checklist

- [ ] Database is connected and synced
- [ ] Backend API is accessible
- [ ] AI Service is responding
- [ ] Frontend can communicate with backend
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] Test signup/login functionality
- [ ] Test crop recommendation feature
- [ ] Check all farm CRUD operations

---

## Troubleshooting

### Issue: CORS Errors
**Solution**: Update `backend/server.js` CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.onrender.com'],
  credentials: true
}));
```

### Issue: Database Connection Failed
**Solution**: 
- Verify DATABASE_URL is correct
- Check if database service is running
- Ensure firewall rules allow connection

### Issue: AI Service Not Responding
**Solution**:
- Check AI service logs in Render dashboard
- Verify gunicorn is installed: Add to requirements.txt
- Check if the service is sleeping (free tier sleeps after inactivity)

### Issue: Frontend Can't Connect to Backend
**Solution**:
- Update `frontend/src/utils/api.js` with production backend URL
- Rebuild and redeploy frontend
- Check browser console for errors

---

## Free Tier Limitations

### Render Free Tier
- Services sleep after 15 minutes of inactivity
- 750 hours/month of runtime
- Slower cold starts
- Limited bandwidth

### Solutions for Free Tier
1. Use a service like UptimeRobot to ping your services every 14 minutes
2. Upgrade to paid tier for production use
3. Use Railway or Fly.io for better free tier options

---

## Monitoring & Maintenance

1. **Set up monitoring**: Use Render's built-in logs
2. **Database backups**: Enable automatic backups in Render
3. **Error tracking**: Consider integrating Sentry
4. **Performance monitoring**: Use Render's metrics dashboard

---

## Next Steps

1. Set up custom domain (optional)
2. Enable HTTPS (automatic on Render)
3. Set up CI/CD pipeline
4. Configure environment-specific settings
5. Add database migrations
6. Implement proper logging
7. Set up monitoring and alerts

---

## Support

For issues or questions:
- Check Render documentation: https://render.com/docs
- Railway docs: https://docs.railway.app
- Vercel docs: https://vercel.com/docs

Good luck with your deployment! 🚀
