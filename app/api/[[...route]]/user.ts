// user.ts
import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";
import { createTemporaryUserSchema } from "@/db/schema";
import { useCreateCart } from "@/features/cart/api/use-create-cart";

const app = new Hono()

.get(
  "/",
  async (c) => {
    const auth = getAuth(c); // Implement this function to get the current user from the request

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await db.user.findUnique({
      where: { id: auth.userId },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  }
);

// Get a user by ID
.get(
  "/:id",
  zValidator("param", z.object({
    id: z.string(),
  })),
  async (c) => {
    const { id } = c.req.valid("param");

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  }
)



// Create a new user
.post(
  "/",
  zValidator("json", createTemporaryUserSchema.omit({
    id: true,
  })),
  async (c) => {
    const values = c.req.valid("json");

    const user = await db.user.create({
      data: {
        id: createId(),
        ...values,
      },
    });

    // Initialize a cart for the new user using the createCart function
    const cart = await useCreateCart(user.userId);

    return c.json({ user, cart });
  }
)

// Update user attributes
.patch(
  "/:id",
  zValidator("param", z.object({
    id: z.string(),
  })),
  zValidator("json", z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
  })),
  async (c) => {
    const { id } = c.req.valid("param");
    const { name, email, image } = c.req.valid("json");

    const user = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        image,
      },
    });

    return c.json({ user });
  }
)

// Delete a user
.delete(
  "/:id",
  zValidator("param", z.object({
    id: z.string(),
  })),
  async (c) => {
    const { id } = c.req.valid("param");

    await db.user.delete({
      where: { id },
    });

    return c.json({ message: "User deleted" });
  }
);

export default app;