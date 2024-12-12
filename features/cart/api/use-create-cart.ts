import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "../hooks/use-cart-store";

import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.cart.$post>;
type RequestType = InferRequestType<typeof client.api.cart.$post>["json"];

export const useCreateCart = () => {
  const { cartId } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.cart.$post({ json:
        {
          id: cartId!
        }
       });
      return await response.json()
    },
    onSuccess: () => {
      toast({
        title: "Cart Created",
        description: "You can continue shopping!",
      })
      queryClient.invalidateQueries({ queryKey:["cart"] });
    },
    onError: () => { 
      toast({
        title: "Failed to create Cart",
      })
    },
  });

  return mutation
}