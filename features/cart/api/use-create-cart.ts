import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { createCartSchema } from "@/db/schema";

type ResponseType = InferResponseType<typeof client.api.cart.$post>;
type RequestType = InferRequestType<typeof client.api.cart.$post>["json"];

export const useCreateCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (data) => {
      // Validate the data before sending
      const validatedData = createCartSchema.parse({
        userId: data.userId,
        items: data.items.map((item) =>
          cartItemSchema.omit({ cartId: true }).parse(item)
        ),
      });

      const response = await client.api.cart.$post({
        json: validatedData,
      });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};