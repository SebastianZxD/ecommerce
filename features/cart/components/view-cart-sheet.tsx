'use client';

import { useCartStore } from "@/features/cart/hooks/use-cart-store";
import { useGetCartItems } from "@/features/cart-items/api/use-get-cart-items";
import CartSheet from "./cart-sheet";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useStore from "@/features/cart-items/hooks/useStore";

// const formSchema = insertCategorySchema.pick({
//   name: true,
// });

// type FormValues = z.input<typeof formSchema>;

// items: {
//   product: {
//       id: string;
//       name: string;
//       description: string | null;
//       price: number;
//       imageURL: string | null;
//       createdAt: string;
//   };
//   cartId: string;
//   id: string;
//   price: number;
//   quantity: number;
//   productId: string;
// }[];
// id: string;
// createdAt: string;
// updatedAt: string;
// userId: string;
// } | null, Error>


export const ViewCartSheet = () => {
  const { isCartOpen, onCartClose } = useCartStore();
  const cartId = useStore(useCartStore, (state) => state.cartId)
  const cartQuery = useGetCartItems(cartId);
  const isLoading = cartQuery.isLoading;

  const cartItems = cartQuery.data?.items?.map(item => ({
    ...item.product,
    quantity: item.quantity,
    cartItemId: item.id
  })) ?? [];     



  

  // const mutation = useCreateCategory();
  // const onSubmit = (values: FormValues) => {
  //   mutation.mutate(values, {
  //     onSuccess: () => {
  //       onClose();
  //     }
  //   });
  // }


  return (
          <Sheet open={isCartOpen} onOpenChange={onCartClose}>
            <SheetContent className="space-y-4 h-fulls">
              {isLoading ? (
                <SheetHeader className="w-full flex items-center h-full">
                  <SheetTitle>
                    Loading Cart...
                  </SheetTitle>
                  <SheetDescription>
                    ...
                  </SheetDescription>
                  <div className="flex flex-col w-full gap-4 h-full justify-around">
                    <div className="flex flex-row gap-2 border-black">
                      <div className="flex flex-col gap-2 justify-between w-full">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <Skeleton className='h-[125px] w-[200px]'/>
                    </div>
                    <Skeleton className='w-full h-10'/>
                    <div className="flex flex-row gap-2 border-black">
                      <div className="flex flex-col gap-2 justify-between w-full">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                        <Skeleton className='h-[125px] w-[200px]'/>
                    </div>
                  </div>
                  <Skeleton className='w-full h-10'/>
                </SheetHeader>
              ) : (
                <CartSheet 
                  cartId={cartId}
                  isLoading={cartQuery.isLoading} 
                  cartItems={cartItems}
                />
              )}
            </SheetContent>
          </Sheet>
  );
};