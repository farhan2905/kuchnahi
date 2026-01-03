# Quick Start Guide - Kuchnahi Website

## Problem: "npm run dev" not working?

The `package.json` files are in subdirectories, not in the root `kuchnahi-website` folder.

## Solution: Use the Correct Commands

### Option 1: Start Backend Only
```bash
cd kuchnahi-website\backend
npm run dev
```

### Option 2: Start Frontend Only
```bash
cd kuchnahi-website\frontend
npm run dev
```

### Option 3: Start Both Servers (Easiest)

**Windows:**
```bash
cd kuchnahi-website
START_SERVERS.bat
```

**Or manually in two separate terminals:**

Terminal 1 (Backend):
```bash
cd kuchnahi-website\backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd kuchnahi-website\frontend
npm run dev
```

## Before Starting: Complete These Steps

### 1. Install PostgreSQL and Create Database
1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Open pgAdmin (included with installation)
3. Create database named: `kuchnahi_db`

### 2. Configure Backend Environment
```bash
cd kuchnahi-website\backend
copy .env.example .env
```

Edit `.env` and set your DATABASE_URL:
```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/kuchnahi_db"
```

### 3. Run Database Migrations
```bash
cd kuchnahi-website\backend
npm run prisma:generate
npm run prisma:migrate
```

### 4. Seed Database (Optional)
```bash
npm run prisma:seed
```

### 5. Configure Frontend Environment
```bash
cd kuchnahi-website\frontend
copy .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 6. Add Placeholder Images

You need to add placeholder images to these directories:

**kuchnahi-website\frontend\public\images\**
- bag.png (120x120px)
- jacket.png (100x140px)
- shoe.png (140x80px)
- we-are-bg.jpg (1920x1080px)

**kuchnahi-website\frontend\public\images\projects\**
- chromor.jpg
- movi.jpg
- loreipsum.jpg

**kuchnahi-website\frontend\public\icons\**
- branding.svg
- web-dev.svg
- ui-ux.svg
- marketing.svg
- mobile.svg
- consulting.svg

**Quick Tip:** Create simple colored rectangles as placeholders, or download from:
- [placeholder.com](https://placeholder.com/)
- [unsplash.com](https://unsplash.com/)

## Verify Everything Works

### 1. Check Backend
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Check Projects API
```bash
curl http://localhost:3001/api/projects
```

### 3. Check Services API
```bash
curl http://localhost:3001/api/services
```

### 4. Open Website
Open browser and navigate to:
```
http://localhost:3000
```

## Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running (check Windows Services)
- Verify DATABASE_URL in `.env` is correct
- Ensure database `kuchnahi_db` exists in pgAdmin

### "Port already in use"
```bash
# Check what's using port 3001
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <PID> /F

# Or for port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Module not found" errors
```bash
# Reinstall dependencies
cd kuchnahi-website\backend
npm install

cd kuchnahi-website\frontend
npm install
```

### TypeScript errors in VS Code
- Wait a few seconds for TypeScript server to reload
- Or restart TypeScript server: Ctrl+Shift+P → "TypeScript: Restart TS Server"

## Access Points

Once running:

| Service | URL | Description |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Main website |
| Backend Health | http://localhost:3001/health | API health check |
| Projects API | http://localhost:3001/api/projects | Get all projects |
| Services API | http://localhost:3001/api/services | Get all services |
| Contact API | http://localhost:3001/api/contact | Submit inquiry |

## Development Workflow

### Adding a New Project
```bash
curl -X POST http://localhost:3001/api/projects ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"New Project\",\"description\":\"Description\",\"imageUrl\":\"/images/projects/new.jpg\",\"category\":\"Tech\",\"tags\":[\"Development\"],\"featured\":true}"
```

### Adding a New Service
```bash
curl -X POST http://localhost:3001/api/services ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"New Service\",\"tagline\":\"Tagline\",\"iconUrl\":\"/icons/new.svg\",\"description\":\"Description\",\"order\":7}"
```

### Testing Contact Form
```bash
curl -X POST http://localhost:3001/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"message\":\"Test message\"}"
```

---

**Need Help?** Check the full [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.
