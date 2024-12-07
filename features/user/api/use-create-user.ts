import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useCreateCart } from "@/features/cart/api/use-create-cart";

type CreateUserResponseType = InferResponseType<typeof client.api.user.$post>;
type CreateUserRequestType = InferRequestType<typeof client.api.user.$post>["json"];

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateUserResponseType,
    Error,
    CreateUserRequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.user.$post({
        json,
      });
      const user = await response.json();

      // Initialize a cart for the new user using the createCart function
      await useCreateCart(user.id).mutateAsync();

      return user;
    },
    onSuccess: (user) => {
      
      queryClient.invalidateQueries({ queryKey: ["user", { id: user.id }] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      
    },
  });

  return mutation;
};