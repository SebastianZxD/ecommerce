import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';


export const useGetProduct = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["products", { id }],
    queryFn: async () => {
      const response = await client.api.products[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch Product');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}