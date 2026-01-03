# Kuchnahi Website - Full Stack Implementation

A full-stack digital agency portfolio website replicating Kuchnahi.netlify.app with dynamic content management, smooth animations, and a complete backend API.

## Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router and SSR
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation engine
- **Lenis** - Smooth momentum scrolling

### Backend
- **Node.js** - Runtime environment
- **Express** - REST API framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database toolkit

## Project Structure

```
kuchnahi-website/
├── frontend/                    # Next.js Application
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── Header.tsx           # Navigation with overlay
│   │   ├── Hero.tsx             # Hero with typewriter effect
│   │   ├── WeAre.tsx            # Scroll reveal animation
│   │   ├── Work.tsx             # Projects section
│   │   ├── Services.tsx          # Services grid
│   │   └── Footer.tsx           # Contact form
│   ├── lib/
│   │   ├── api.ts               # API client
│   │   └── lenis.ts            # Smooth scroll setup
│   ├── public/
│   │   └── images/              # Static images
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/                     # Express API Server
│   ├── src/
│   │   ├── index.ts             # Server entry
│   │   ├── routes/
│   │   │   ├── projects.ts       # Project routes
│   │   │   ├── services.ts       # Service routes
│   │   │   └── contact.ts       # Contact routes
│   │   ├── controllers/
│   │   │   ├── projectsController.ts
│   │   │   ├── servicesController.ts
│   │   │   └── contactController.ts
│   │   └── middleware/
│   │       └── validation.ts     # Request validation
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts             # Seed data
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 15+ installed and running
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd kuchnahi-website
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Variables
Copy `.env.example` to `.env` and configure:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/kuchnahi_db"
FRONTEND_URL="http://localhost:3000"
```

#### Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run Migrations
npm run prisma:migrate

# Seed Database (optional)
npm run prisma:seed
```

#### Start Backend Server
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Environment Variables
Copy `.env.example` to `.env.local` and configure:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Start Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Features

### Frontend Features

1. **Header & Navigation**
   - Fixed navigation bar
   - Hamburger menu with full-screen overlay
   - Staggered menu item animations
   - Backdrop blur effect

2. **Hero Section**
   - Typewriter text cycling effect
   - Floating images with sine wave animations
   - Scroll indicator

3. **We Are Section**
   - Scroll-linked mask expansion (30% → 100% width)
   - Border radius transformation (50px → 0px)
   - Sticky positioning for smooth scroll effect

4. **Work Section**
   - Dynamic project cards from API
   - Hover effects on images
   - Category and tags display
   - Scroll-triggered animations

5. **Services Section**
   - Responsive grid layout
   - Service cards with icons
   - Hover effects with arrow animation

6. **Footer & Contact**
   - Mesh gradient background
   - Contact form with validation
   - Success/error feedback
   - Social links

7. **Animations**
   - Lenis smooth scrolling
   - Framer Motion transitions
   - Scroll-triggered reveals
   - Parallax effects

### Backend Features

1. **RESTful API**
   - Projects CRUD operations
   - Services CRUD operations
   - Contact form submission
   - Inquiry management

2. **Database Models**
   - Project (with tags and categories)
   - Service (with ordering)
   - Inquiry (with status tracking)
   - Admin (for authentication)

3. **Middleware**
   - Request validation
   - CORS configuration
   - Security headers (Helmet)
   - Error handling

4. **API Endpoints**

   **Projects**
   - `GET /api/projects` - Get all projects
   - `GET /api/projects/:id` - Get project by ID
   - `POST /api/projects` - Create project
   - `PUT /api/projects/:id` - Update project
   - `DELETE /api/projects/:id` - Delete project

   **Services**
   - `GET /api/services` - Get all services
   - `GET /api/services/:id` - Get service by ID
   - `POST /api/services` - Create service
   - `PUT /api/services/:id` - Update service
   - `DELETE /api/services/:id` - Delete service

   **Contact**
   - `POST /api/contact` - Submit inquiry
   - `GET /api/contact` - Get all inquiries (admin)
   - `PATCH /api/contact/:id/status` - Update inquiry status

## Database Schema

### Project Model
```prisma
model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  imageUrl    String
  category    String
  year        String?
  tags        String[]
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Service Model
```prisma
model Service {
  id          Int      @id @default(autoincrement())
  name        String
  tagline     String
  iconUrl     String
  description String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Inquiry Model
```prisma
model Inquiry {
  id        Int      @id @default(autoincrement())
  email     String
  message   String
  status    String   @default("UNREAD")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Development Workflow

### Adding New Projects
1. Add project to database via API or directly:
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "imageUrl": "/images/project.jpg",
    "category": "Tech",
    "tags": ["Branding", "Development"]
  }'
```

### Adding New Services
1. Add service to database:
```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Service",
    "tagline": "Service tagline",
    "iconUrl": "/icons/service.svg",
    "description": "Service description"
  }'
```

### Running Tests
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm run build
npm start
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Backend (Railway/Heroku)
1. Push code to GitHub
2. Import project in Railway
3. Configure PostgreSQL database
4. Set environment variables
5. Deploy

### Database (Supabase/Railway)
1. Create PostgreSQL instance
2. Get connection string
3. Update `DATABASE_URL` in backend `.env`
4. Run migrations

## Performance Optimization

- **Code Splitting** - Dynamic imports for heavy components
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Load components on demand
- **Caching** - Redis for API responses
- **Compression** - Gzip compression enabled
- **Database Indexing** - Indexed columns for faster queries

## Security

- **Helmet** - Security headers
- **CORS** - Cross-origin restrictions
- **Input Validation** - Request validation middleware
- **SQL Injection Prevention** - Prisma ORM
- **Environment Variables** - Secrets not committed

## Troubleshooting

### Common Issues

**TypeScript Errors**
- Run `npm install` in both frontend and backend
- Restart TypeScript server

**Database Connection Failed**
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Ensure database exists

**Port Already in Use**
- Kill process on port 3000 or 3001
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Images Not Loading**
- Place images in `frontend/public/images/`
- Check file paths in components

## Future Enhancements

- [ ] Blog section with markdown support
- [ ] Multi-language support (i18n)
- [ ] Dark/Light mode toggle
- [ ] Advanced search and filtering
- [ ] Project case study pages
- [ ] Team member profiles
- [ ] Client testimonials
- [ ] Admin dashboard
- [ ] Image upload functionality
- [ ] Email notifications

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Next.js, Express, and PostgreSQL**
