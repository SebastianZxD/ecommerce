import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "@/lib/prisma";
import { CartCreateInputSchema, CartSchema } from "@/prisma/generated/zod";

const app = new Hono()
.get(
  "/",
  async (c) => {
    const data = await db.cart.findFirst({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      cacheStrategy: { ttl: 60 },
    });
    return c.json({ data })
  }
)
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
  zValidator("json", CartSchema.pick({
    id: true,
  })),
  async (c) => {
    const values = c.req.valid("json")
    const data = await db.cart.create({
      data: {
        id: values.id
      }
    })
    return c.json({ data })
  }
);

export default app;

//TODO ADD Validation Middleware