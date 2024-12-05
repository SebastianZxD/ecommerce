// seed.ts
import { PrismaClient } from '@prisma/client';
import { cosmeticsData } from './products';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing products
    // Seed new products
    const products = await Promise.all(
      cosmeticsData.map((product) => 
        prisma.product.create({
          data: product
        })
      )
    );

    console.log(`Seeded ${products.length} products successfully`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });