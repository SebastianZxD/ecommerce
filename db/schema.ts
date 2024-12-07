// schemas/userSchema.ts
import { z } from "zod";

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

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const createTemporaryUserSchema = userSchema.pick({
  id: true,
});



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

export const createAccountSchema = accountSchema.pick({
  userId: true,
  type: true,
  provider: true,
  providerAccountId: true,
});


export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  imageURL: z.string().url().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const createProductSchema = productSchema.pick({
  name: true,
  description: true,
  price: true,
  imageURL: true,
});

export const cartSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: z.string().cuid(),
});

export const createCartSchema = cartSchema.pick({
  userId: true,
});


export const cartItemSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number(),
  productId: z.string().cuid(),
  cartId: z.string().cuid(),
});

export const createCartItemSchema = cartItemSchema.pick({
  quantity: true,
  productId: true,
  cartId: true,
});


export const orderSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: z.string().cuid(),
});

export const createOrderSchema = orderSchema.pick({
  userId: true,
});


export const orderItemSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number(),
  productId: z.string().cuid(),
  orderId: z.string().cuid(),
});

export const createOrderItemSchema = orderItemSchema.pick({
  quantity: true,
  productId: true,
  orderId: true,
});