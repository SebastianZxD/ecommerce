import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "@/lib/prisma";

const app = new Hono()
.get(
  "/",
  async (c) => {
    const data = await db.product.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageURL: true,
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

    const data = await db.product.findUnique({
      where: {
        id: id
      },
      cacheStrategy: { ttl: 60 },
    });
    return c.json({ data })
  }
)
export default app;