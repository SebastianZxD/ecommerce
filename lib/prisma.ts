import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cartSchema, cartItemSchema } from '@/db/schema';

const prisma = new PrismaClient().$extends({
  query: {
    cart: {
      create({ args, query }) {
        args.data = cartSchema.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = cartSchema.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = cartSchema.parse(args.create);
        args.update = cartSchema.partial().parse(args.update);
        return query(args);
      },
    },
    cartItem: {
      create({ args, query }) {
        args.data = cartItemSchema.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = cartItemSchema.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = cartItemSchema.parse(args.create);
        args.update = cartItemSchema.partial().parse(args.update);
        return query(args);
      },
    },
  },
}).$extends(withAccelerate());

export const db = prisma;
export default db;