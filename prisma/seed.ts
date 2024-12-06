// seed.ts
import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { cosmeticsData } from './products';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing products
    await prisma.product.deleteMany();

    // Seed new products with generated IDs
    const products = await Promise.all(
      cosmeticsData.map((product) => 
        prisma.product.create({
          data: {
            ...product,
            id: createId()
          }
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