# Kuchnahi Website - Setup Guide

This guide will help you complete the remaining setup steps to run the Kuchnahi website locally.

## Prerequisites

Before proceeding, ensure you have the following installed:

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **PostgreSQL 15+** - Download from [postgresql.org](https://www.postgresql.org/download/)
3. **Git** - Download from [git-scm.com](https://git-scm.com/)

## Step 1: Install PostgreSQL

### Windows
1. Download the PostgreSQL installer for Windows
2. Run the installer and follow the setup wizard
3. Set a password for the `postgres` user (remember this!)
4. Complete the installation

### Verify Installation
Open Command Prompt and run:
```bash
psql --version
```

### Create Database
1. Open pgAdmin (included with PostgreSQL installation)
2. Login with your postgres credentials
3. Right-click on "Databases" → Create → Database
4. Name it: `kuchnahi_db`
5. Click Save

### Get Connection String
1. In pgAdmin, right-click on `kuchnahi_db`
2. Select "Properties"
3. Copy the "Connection string"
4. Format should be: `postgresql://username:password@localhost:5432/kuchnahi_db`

## Step 2: Configure Backend Environment

1. Navigate to the backend directory:
```bash
cd kuchnahi-website/backend
```

2. Copy the example environment file:
```bash
copy .env.example .env
```

3. Open `.env` in a text editor and configure:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/kuchnahi_db"
FRONTEND_URL="http://localhost:3000"
```

Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your PostgreSQL credentials.

## Step 3: Run Database Migrations

1. Generate Prisma Client:
```bash
cd kuchnahi-website/backend
npm run prisma:generate
```

2. Run migrations to create database tables:
```bash
npm run prisma:migrate
```

You should see output like:
```
Running migrate 20240101000000_init

The following migration(s) have been applied:
```

## Step 4: Seed Database with Initial Data

```bash
npm run prisma:seed
```

You should see:
```
Database seeded successfully!
```

## Step 5: Configure Frontend Environment

1. Navigate to the frontend directory:
```bash
cd kuchnahi-website/frontend
```

2. Copy the example environment file:
```bash
copy .env.example .env.local
```

3. Open `.env.local` and configure:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Step 6: Start Backend Server

Open a new terminal and run:
```bash
cd kuchnahi-website/backend
npm run dev
```

You should see:
```
Server running on port 3001
```

Keep this terminal open!

## Step 7: Start Frontend Server

Open another new terminal and run:
```bash
cd kuchnahi-website/frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Step 8: Access the Website

Open your browser and navigate to:
```
http://localhost:3000
```

## Step 9: Add Placeholder Images

The website needs placeholder images to display properly. Create the following images:

### Frontend Images
Place these in `kuchnahi-website/frontend/public/images/`:

1. **bag.png** - Product bag image (120x120px)
2. **jacket.png** - Jacket image (100x140px)
3. **shoe.png** - Shoe image (140x80px)
4. **we-are-bg.jpg** - Background for We Are section (1920x1080px)

### Project Images
Place these in `kuchnahi-website/frontend/public/images/projects/`:

1. **chromor.jpg** - Chromor project thumbnail
2. **movi.jpg** - Movi project thumbnail
3. **loreipsum.jpg** - Loreipsum project thumbnail

### Service Icons
Place these in `kuchnahi-website/frontend/public/icons/`:

1. **branding.svg** - Branding icon
2. **web-dev.svg** - Web development icon
3. **ui-ux.svg** - UI/UX design icon
4. **marketing.svg** - Digital marketing icon
5. **mobile.svg** - Mobile apps icon
6. **consulting.svg** - Consulting icon

**Tip:** You can use placeholder images from:
- [placeholder.com](https://placeholder.com/)
- [unsplash.com](https://unsplash.com/)
- Create simple colored rectangles as temporary placeholders

## Testing the Backend API

### Test Projects Endpoint
```bash
curl http://localhost:3001/api/projects
```

### Test Services Endpoint
```bash
curl http://localhost:3001/api/services
```

### Test Health Check
```bash
curl http://localhost:3001/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"message\":\"This is a test message\"}"
```

## Troubleshooting

### Issue: "Connection refused" when running migrations
**Solution:** Ensure PostgreSQL is running
- Windows: Check Services → PostgreSQL
- Or restart the PostgreSQL service

### Issue: "password authentication failed"
**Solution:** Check your DATABASE_URL in `.env`
- Ensure username and password are correct
- Check that database name matches

### Issue: Frontend shows TypeScript errors
**Solution:** Dependencies might not be installed
```bash
cd kuchnahi-website/frontend
npm install
```

### Issue: Backend won't start
**Solution:** Check if port 3001 is already in use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Issue: Images not displaying
**Solution:** Verify image paths
- Images should be in `public/` folder
- Paths in components should start with `/`
- Check file names match exactly

### Issue: Animations not smooth
**Solution:** Lenis might not be initialized
- Check browser console for errors
- Ensure `initLenis()` is called in `page.tsx`

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes auto-refresh in browser
- Backend: Server restarts on file changes

### Debugging
- **Frontend:** Use React DevTools browser extension
- **Backend:** Use `console.log()` in controllers
- **Database:** Use pgAdmin to view data

### Adding New Content

#### Add a Project
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "description": "Project description here",
    "imageUrl": "/images/projects/my-project.jpg",
    "category": "Tech",
    "tags": ["Development", "Design"],
    "featured": true
  }'
```

#### Add a Service
```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Service",
    "tagline": "Service description",
    "iconUrl": "/icons/new-service.svg",
    "description": "Full description here",
    "order": 7
  }'
```

## Next Steps

Once everything is running:

1. ✅ Verify all sections load correctly
2. ✅ Test smooth scrolling (Lenis)
3. ✅ Test animations (Framer Motion)
4. ✅ Test contact form submission
5. ✅ Check responsive design on mobile
6. ✅ Add your own images and content
7. ✅ Customize colors and styling

## Production Deployment

When ready to deploy:

### Frontend (Vercel)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure `NEXT_PUBLIC_API_URL` environment variable
5. Deploy

### Backend (Railway)
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project → Deploy from GitHub
4. Add PostgreSQL database
5. Configure environment variables
6. Deploy

## Support

If you encounter issues:
1. Check the terminal output for error messages
2. Review browser console for frontend errors
3. Verify PostgreSQL is running
4. Ensure all dependencies are installed
5. Check environment variables are correct

---

**Happy coding! 🚀**
