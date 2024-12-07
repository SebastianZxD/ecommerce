// seed.ts
import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { cosmeticsData } from './products';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
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

    // Create a sample cart
    const cart = await prisma.cart.create({
      data: {
        id: createId(),
        items: {
          create: [
            {
              id: createId(),
              quantity: 2,
              product: { connect: { id: products[0].id } }
            },
            {
              id: createId(),
              quantity: 1,
              product: { connect: { id: products[1].id } }
            }
          ]
        }
      }
    });

    console.log(`Created cart with ID: ${cart.id}`);
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