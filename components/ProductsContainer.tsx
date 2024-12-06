'use client';


import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { useGetProducts } from '@/features/products/api/use-get-products';

export function ProductsContainer() {
  const productsQuery = useGetProducts();
  const productsData = productsQuery.data || [];
  if (productsQuery.isLoading) { 
    <div className='flex flex-col lg:flex-row'>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {productsData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}