import { z } from "zod";
import { Prisma } from "@prisma/client";

// User schema
export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
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
  price: z.number(),
  imageURL: z.string().url().optional(),
  createdAt: z.date().default(() => new Date()),
});

// CartItem schema
export const cartItemSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number().positive(),
  productId: z.string().cuid(),
  cartId: z.string().cuid(),
}) satisfies z.Schema<Prisma.CartItemUncheckedCreateInput>;

// Cart schema
export const cartSchema = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().default(() => new Date()).optional(),
  updatedAt: z.date().default(() => new Date()).optional(),
  userId: z.string().cuid(),
  items: z.object({
    create: z.array(cartItemSchema).optional(),
    connect: z.array(z.object({ id: z.string().cuid() })).optional(),
  }).optional(),
}) satisfies z.Schema<Prisma.CartUncheckedCreateInput>;

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