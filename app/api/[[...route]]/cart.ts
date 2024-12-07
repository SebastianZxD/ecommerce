import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";
import { createCartSchema } from "@/db/schema";

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
  "/items",
  zValidator("param", z.object({
    id: z.string().optional(),
  })),
  async(c) => {
    const { id } = c.req.valid('param');

    if (!id) {
       return c.json({ error: "Missing ID" }, 400);
    }

    const data = await db.cart.findUnique({
      where: { id },
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
.post(
  "/",
  zValidator("json", createCartSchema),
  async (c) => {
    const values = c.req.valid("json");

    const cart = await db.cart.create({
      data: {
        userId: values.userId,
      },
    });

    return c.json({ cart });
  }
);
export default app;