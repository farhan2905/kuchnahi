import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Projects
  const projects = [
    {
      title: 'Chromor',
      description: 'Color and technology merged to create a stunning visual experience.',
      imageUrl: '/images/projects/chromor.jpg',
      category: 'Tech',
      year: '2024',
      tags: ['Branding', 'UI/UX', 'Development'],
      featured: true
    },
    {
      title: 'Movi',
      description: 'A streaming platform reimagined for the modern viewer.',
      imageUrl: '/images/projects/movi.jpg',
      category: 'Entertainment',
      year: '2023',
      tags: ['Product Design', 'Development'],
      featured: true
    },
    {
      title: 'Loreipsum',
      description: 'E-commerce platform with seamless user experience.',
      imageUrl: '/images/projects/loreipsum.jpg',
      category: 'E-commerce',
      year: '2023',
      tags: ['E-commerce', 'Development'],
      featured: false
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Seed Services
  const services = [
    {
      name: 'Branding',
      tagline: 'Brands that resonate',
      iconUrl: '/icons/branding.svg',
      description: 'We create memorable brand identities that connect with your audience.',
      order: 1
    },
    {
      name: 'Web Development',
      tagline: 'Digital experiences built right',
      iconUrl: '/icons/web-dev.svg',
      description: 'High-performance websites and web applications.',
      order: 2
    },
    {
      name: 'UI/UX Design',
      tagline: 'Design that converts',
      iconUrl: '/icons/ui-ux.svg',
      description: 'User-centered design that drives engagement.',
      order: 3
    },
    {
      name: 'Digital Marketing',
      tagline: 'Growth strategies that work',
      iconUrl: '/icons/marketing.svg',
      description: 'Data-driven marketing to grow your business.',
      order: 4
    },
    {
      name: 'Mobile Apps',
      tagline: 'Apps people love',
      iconUrl: '/icons/mobile.svg',
      description: 'Native and cross-platform mobile applications.',
      order: 5
    },
    {
      name: 'Consulting',
      tagline: 'Expert guidance',
      iconUrl: '/icons/consulting.svg',
      description: 'Strategic advice to transform your digital presence.',
      order: 6
    }
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

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
