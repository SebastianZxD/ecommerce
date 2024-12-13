import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends({
}).$extends(withAccelerate());

export const db = prisma;
export default db;