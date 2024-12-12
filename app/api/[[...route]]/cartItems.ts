import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "@/lib/prisma";

const app = new Hono()
.get(
  "/:id",
  zValidator("param", z.object({
    id: z.string().optional(),
  })),
  async(c) => {
    const { id } = c.req.valid('param');

    if (!id) {
      return c.json({ error: "Missing ID" }, 400);
    }

    try {
      const data = await db.cart.findUnique({
        where: { id },
        select: {
          items: {
            include: {
              product: true,
            }
          }
        },
        cacheStrategy: { ttl: 60 },
      });

      return c.json({ data });

    } catch (error) {
      console.error('Error fetching cart:', error);
      return c.json({ error: "Failed to fetch cart" }, 500);
    }
  }
)
.post(
  "/",
  zValidator("json", z.object({
    cartId: z.string().cuid(),
    productId: z.string().cuid(),
    quantity: z.number().int().positive()
  })),
  async (c) => {
    const { cartId, productId, quantity } = c.req.valid("json");

    try {
      const cartItem = await db.cartItem.create({
        data: {
          cartId,
          productId,
          quantity
        },
        include: {
          product: true
        }
      });

      return c.json({ data: cartItem });
    } catch (error) {
      return c.json({ error: "Failed to add item to cart" }, 500);
    }
  }
)

export default app;