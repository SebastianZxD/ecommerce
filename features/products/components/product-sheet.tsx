import { z } from "zod";
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ProductThumbnail from '@/components/ProductThumbnail'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { MinusIcon, PlusIcon, ShoppingCart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductThumbnailSkeleton } from "@/components/ProductThumnailSkeleton";
import { useCreateCart } from "@/features/cart/api/use-create-cart";


const quantitySchema = z.number()
  .min(1, "Quantity must be at least 1")
  .max(99, "Quantity cannot exceed 99")
  .int("Quantity must be a whole number");

type Props = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageURL: string | null;
    createdAt: string;
    isNew?: boolean;
  } | null | undefined
  open: boolean
  onOpenChange: () => void
  isLoading: boolean;
}

type Product = {
  quantity: number;
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageURL: string | null;
  createdAt: string;
  isNew?: boolean;
}

const ProductSheet = ({product, open, onOpenChange, isLoading} :Props)  => {

  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddToCart = () => {
    if (quantity <= 0 || !product) return;

    const payload = {
      ...product,
      quantity,
    };

    const mutation = useCreateCart();
    const onSubmit = (product: Payload) => {
      const { data }
      mutation.mutate(payload, {
        onSuccess: () => {
          
        }
      });
    }
    console.log('Adding to cart:', payload);

    toast({
      title: "Product added to cart!",
      description: `${quantity} x ${product.name} added to your cart`,
      duration: 3000,
    });

    onOpenChange();
  };

  const validateAndSetQuantity = (value: string) => {
    try {
      // Remove leading zeros and convert to number
      const cleanValue = value.replace(/^0+/, '');
      const numValue = cleanValue === '' ? 1 : parseInt(cleanValue);
      
      // Validate with Zod
      const validatedQuantity = quantitySchema.parse(numValue);
      setQuantity(validatedQuantity);
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="space-y-4">
        <div className='relative h-full'>
          <SheetHeader>
            <SheetTitle>
              {product?.name}
            </SheetTitle>
            <SheetDescription>
              {product?.description}
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <ProductThumbnailSkeleton />
          ) : (
            <ProductThumbnail 
              name={product?.name} 
              price={product?.price} 
              discount={undefined} 
              imageURL={product?.imageURL} 
              isNew={product?.isNew}
              description={product?.description}
            />
          )}
          <div className="flex items-center space-x-4 absolute bottom-0 right-0">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => validateAndSetQuantity(e.target.value)}
                className={cn(
                  "w-20 text-center mx-2",
                )}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddToCart}
                disabled={quantity <= 0}
                variant="default"
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                onClick={() => router.push('/checkout')}
                variant='default'
                className="flex items-center gap-2 
                  bg-violet-600"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ProductSheet