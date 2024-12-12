import { z } from 'zod';
import { useRouter } from 'next/navigation';

import ProductThumbnail from '@/components/ProductThumbnail'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { ProductThumbnailSkeleton } from "@/components/ProductThumnailSkeleton";
import AddToCart from "@/components/cart/AddToCart";
import { Skeleton } from '@/components/ui/skeleton';
import { CartItemSchema, CartSchema } from '@/prisma/generated/zod';
import { useCartStore } from '@/features/cart/hooks/use-cart-store';
import { useGetCart } from '@/features/cart/api/use-get-cart';
import useStore from '@/features/cart-items/hooks/useStore';

const cartFormSchema = CartSchema.pick({
  id: true,
});

const cartItemFormSchema = CartItemSchema.pick({
  cartId: true,
})

type CartFormValues = z.input<typeof cartFormSchema>

type CartItemFormValues = z.input<typeof cartItemFormSchema>

interface Props {
  product: ProductProps
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

interface ProductProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageURL: string | null;
  createdAt: string;
} 

const ProductSheet = ({
  product, 
  open, 
  onOpenChange, 
  isLoading 
}: Props) => {
  const router = useRouter();
  
  const cartId = useStore(useCartStore, (state) => state.cartId)
  const cartQuery = useGetCart(cartId);
  const { data } = cartQuery;

  const onSubmit = (values: CartItemFormValues) => {
    if (!data?.id) {

    }
  }

  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {isLoading ?  (
      <SheetContent className="space-y-4">
        <div className='relative h-full'>
        <SheetHeader className='flex items-center'>
            <SheetTitle>
              Loading Product...
            </SheetTitle>
            <Skeleton className="h-6 w-[200px]" />
            <SheetDescription>
              ...
            </SheetDescription>
            <Skeleton className="h-4 w-[300px]" />
          </SheetHeader>
        <div className="flex flex-col space-y-4 items-center">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="absolute bottom-0 flex justify-between w-full">
          <div className='flex gap-2'>
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
            <Skeleton className="h-10 w-[100px]" />
          
          </div>
        </div>
      </SheetContent>
      ) : (
      <SheetContent className="space-y-4">
        <div className='relative h-full'>
          <SheetHeader className='flex items-center'>
            <SheetTitle>
              {product?.name}
            </SheetTitle>
            <SheetDescription>
              {product?.description}
            </SheetDescription>
          </SheetHeader>
          {product? (
            <ProductThumbnail 
              name={product?.name}
              price={product?.price}
              description={product?.description}
              imageURL={product?.imageURL}
            />
          ) : (
            <ProductThumbnailSkeleton />
          )}
          <div className="absolute bottom-0 flex justify-between w-full">
              <AddToCart productData={product} onSubmit={onSubmit}/>
              <Button
                onClick={() => router.push('/checkout')}
                variant='default'
                className="flex items-center gap-2 bg-violet-600"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
          </div>
        </div>
      </SheetContent>
      )}
    </Sheet>
  )
}

export default ProductSheet