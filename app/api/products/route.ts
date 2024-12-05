import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const productsArray = await prisma.product.findMany();
    
    if (!productsArray) {
      return NextResponse.json(
        { error: 'No products found' },
        { status: 404 }
      );
    }

    // Transform array to object with data property
    const transformedResponse = {
      data: productsArray
    };

    return NextResponse.json(transformedResponse, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}