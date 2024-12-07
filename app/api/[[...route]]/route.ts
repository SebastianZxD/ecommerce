import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import products from './products'
import cart from './cart'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app
  .route("products", products)
  .route("cart", cart)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;