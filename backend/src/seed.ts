import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.admin.deleteMany();

  // Create projects with layoutType and accentColor
  const projects = await prisma.project.createMany({
    data: [
      {
        title: "Chromor",
        description: "Color and tech that converts",
        imageUrl: "/images/chromor.jpg",
        category: "Tech",
        year: "2023",
        tags: ["Design", "Development"],
        featured: true,
        layoutType: "featured",
        accentColor: "#FF6B6B"
      },
      {
        title: "Movi",
        description: "Cinematic experiences",
        imageUrl: "/images/movi.jpg",
        category: "Film",
        year: "2023",
        tags: ["Video", "Animation"],
        featured: false,
        layoutType: "grid",
        accentColor: "#4ECDC4"
      },
      {
        title: "Loreipsum",
        description: "Digital storytelling",
        imageUrl: "/images/loreipsum.jpg",
        category: "Content",
        year: "2023",
        tags: ["Writing", "Content"],
        featured: false,
        layoutType: "list",
        accentColor: "#45B7D1"
      },
      {
        title: "Brandify",
        description: "Brand identity solutions",
        imageUrl: "/images/brandify.jpg",
        category: "Branding",
        year: "2023",
        tags: ["Branding", "Design"],
        featured: false,
        layoutType: "grid",
        accentColor: "#96CEB4"
      },
      {
        title: "TechFlow",
        description: "Innovation in motion",
        imageUrl: "/images/techflow.jpg",
        category: "Tech",
        year: "2023",
        tags: ["Technology", "Innovation"],
        featured: true,
        layoutType: "featured",
        accentColor: "#FFEAA7"
      },
      {
        title: "CreativeHub",
        description: "Creative solutions",
        imageUrl: "/images/creativehub.jpg",
        category: "Creative",
        year: "2023",
        tags: ["Creative", "Design"],
        featured: false,
        layoutType: "grid",
        accentColor: "#DDA0DD"
      }
    ]
  });

  // Create services
  const services = await prisma.service.createMany({
    data: [
      {
        name: "Branding",
        tagline: "Brands that resonate",
        iconUrl: "/images/branding-icon.png",
        description: "Create memorable brand identities that stand out in crowded markets."
      },
      {
        name: "Web Development",
        tagline: "Digital experiences that convert",
        iconUrl: "/images/web-icon.png",
        description: "Build high-performance websites and web applications."
      },
      {
        name: "Marketing",
        tagline: "Strategies that drive growth",
        iconUrl: "/images/marketing-icon.png",
        description: "Data-driven marketing solutions for maximum impact."
      },
      {
        name: "Content Creation",
        tagline: "Stories that engage",
        iconUrl: "/images/content-icon.png",
        description: "Compelling content that connects with your audience."
      }
    ]
  });

  // Create admin user
  const admin = await prisma.admin.create({
    data: {
      email: "admin@kuchnahi.com",
      password: "password123", // In production, use proper hashing
      name: "Admin User"
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });