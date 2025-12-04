# 🚀 Deployment Checklist

Use this checklist to ensure a smooth deployment of GreenRoot.

## Pre-Deployment

- [ ] Code is committed to Git
- [ ] All tests pass locally
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] API endpoints are tested
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend starts without errors
- [ ] AI service responds to requests

## GitHub Setup

- [ ] Create GitHub repository
- [ ] Push code to GitHub
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/greenroot.git
  git branch -M main
  git push -u origin main
  ```
- [ ] Verify all files are pushed
- [ ] Check .gitignore is working (no .env files pushed)

## Render Deployment

### Database
- [ ] Create MySQL/PostgreSQL database on Render
- [ ] Save database connection URL
- [ ] Test database connection

### Backend
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Configure build command: `npm install`
- [ ] Configure start command: `node server.js`
- [ ] Add environment variables:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET` (generate with: `openssl rand -base64 32`)
  - [ ] `AI_SERVICE_URL`
  - [ ] `ALLOWED_ORIGINS`
  - [ ] `NODE_ENV=production`
- [ ] Deploy and verify service is running
- [ ] Test API endpoint: `https://your-backend.onrender.com/`

### AI Service
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory to `ai-service`
- [ ] Configure build command: `pip install -r requirements.txt`
- [ ] Configure start command: `gunicorn -b 0.0.0.0:$PORT app:app`
- [ ] Deploy and verify service is running
- [ ] Test endpoint: `https://your-ai-service.onrender.com/predict`

### Frontend
- [ ] Create new Static Site
- [ ] Connect GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Configure build command: `npm install && npm run build`
- [ ] Configure publish directory: `dist`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL=https://your-backend.onrender.com/api`
- [ ] Deploy and verify site is live

## Post-Deployment

### Testing
- [ ] Visit frontend URL
- [ ] Test user signup
- [ ] Test user login
- [ ] Test adding a farm
- [ ] Test crop recommendation
- [ ] Test all CRUD operations
- [ ] Check browser console for errors
- [ ] Test on mobile device

### Configuration
- [ ] Update CORS settings with production URLs
- [ ] Verify all environment variables are set
- [ ] Check database connections
- [ ] Review security settings
- [ ] Enable HTTPS (should be automatic on Render)

### Monitoring
- [ ] Set up error tracking (optional: Sentry)
- [ ] Configure logging
- [ ] Set up uptime monitoring (optional: UptimeRobot)
- [ ] Review Render logs for errors

### Documentation
- [ ] Update README with production URLs
- [ ] Document any deployment-specific configurations
- [ ] Create user guide (optional)
- [ ] Document API endpoints

## Optional Enhancements

- [ ] Set up custom domain
- [ ] Configure CDN for frontend
- [ ] Set up CI/CD pipeline
- [ ] Add database backups
- [ ] Implement rate limiting
- [ ] Add API documentation (Swagger)
- [ ] Set up staging environment
- [ ] Configure SSL certificates

## Troubleshooting

If something goes wrong:

1. **Check Render logs** for each service
2. **Verify environment variables** are set correctly
3. **Test API endpoints** individually
4. **Check CORS configuration** if frontend can't connect
5. **Verify database connection** string
6. **Ensure all services are running** (not sleeping)

## Rollback Plan

If deployment fails:

1. Check Render deployment logs
2. Revert to previous commit if needed
3. Redeploy from working commit
4. Contact support if issues persist

---

## Quick Commands

### Generate JWT Secret
```bash
openssl rand -base64 32
```

### Test Backend Locally
```bash
cd backend && npm run dev
```

### Test AI Service Locally
```bash
cd ai-service && python app.py
```

### Build Frontend
```bash
cd frontend && npm run build
```

### Test Production Build Locally
```bash
cd frontend && npm run preview
```

---

**Remember**: Free tier services on Render sleep after 15 minutes of inactivity. First request after sleep may take 30-60 seconds.

Good luck! 🍀
