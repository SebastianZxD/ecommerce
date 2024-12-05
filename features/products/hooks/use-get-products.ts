import { useQuery } from '@tanstack/react-query';
import { ProductsResponse } from '@/types/product';

export function useGetProducts() {
  return useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}