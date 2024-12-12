import { z } from "zod";
import { Prisma } from "@prisma/client";

// User schema
export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  verified: z.date().optional(),
  image: z.string().url().optional(),
  password: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Account schema
export const accountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional(),
  access_token: z.string().optional(),
  expires_at: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  session_state: z.string().optional(),
});

// Product schema
export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().int(), // Changed to ensure integer
  imageURL: z.string().url().optional(),
  createdAt: z.date().default(() => new Date()),
  cartItems: z.array(z.object({ // Added relation
    id: z.string().cuid()
  })).optional(),
  orderItems: z.array(z.object({ // Added relation
    id: z.string().cuid()
  })).optional(),
});


// CartItem schema
export const cartItemSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number().int().positive(),
  price: z.number().int(), // Added missing field
  productId: z.string().cuid(),
  cartId: z.string().cuid(),
  product: z.object({ // Added product relation
    id: z.string().cuid()
  }).optional(),
  cart: z.object({ // Added cart relation
    id: z.string().cuid()
  }).optional(),
}) satisfies z.Schema<Prisma.CartItemUncheckedCreateInput>;

// Cart schema
export const cartSchema = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: z.string().cuid().optional(),
  user: z.object({ // Added user relation
    id: z.string().cuid()
  }).optional(),
  items: z.array(z.object({ // Simplified items relation
    id: z.string().cuid()
  })).optional(),
});

// CreateCart schema
export const createCartSchema = cartSchema.omit({ id: true, createdAt: true, updatedAt: true });

// Order schema
export const orderSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: z.string().cuid(),
});

// OrderItem schema
export const orderItemSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number(),
  productId: z.string().cuid(),
  orderId: z.string().cuid(),
});