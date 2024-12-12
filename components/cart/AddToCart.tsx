import { z } from 'zod'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form';
import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGetCart } from '@/features/cart/api/use-get-cart';
import { useGetCartItems } from '@/features/cart-items/api/use-get-cart-items';
import { useCreateCart } from '@/features/cart/api/use-create-cart';
import { useOpenProduct } from '@/features/products/hooks/use-open-product';


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';

import { CartItemSchema } from '@/prisma/generated/zod';

const formSchema = CartItemSchema.pick({
  id: true,
  quantity: true,
  cartId: true,
  price: true,
})

type FormValues = z.infer<typeof formSchema>


type Props = {
  cartId?: string
  productData: ProductData
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
}

interface ProductData {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageURL: string | null;
    createdAt: string;
  }

const AddToCartForm = ({
  cartId,
  productData,
  onSubmit,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const { product } = productData;
  const { onClose } = useOpenProduct();
  const cartQuery = useGetCart(cartId);
  const cartDatabaseId = cartQuery.data?.id;
  const cartItemsQuery = useGetCartItems(cartId);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const isDisabled = isCreatingCart || cartItemsQuery.isLoading;
  const mutation = useCreateCart();

  
  const quantitySchema = z.number()
  .min(1, "Quantity must be at least 1")
  .max(99, "Quantity cannot exceed 99")
  .int("Quantity must be a whole number");

  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

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


  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  }


  return (
    <div className='flex'>
      <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(0, quantity - 1))}
          disabled={isDisabled}
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
          disabled={isDisabled}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={(e) => (e.preventDefault)}
          disabled={quantity <= 0 || isDisabled}
          variant="default"
          className="flex-1"
          type='submit'
        >
          Add to Cart
          <ShoppingCart className="mr-2 h-4 w-4" />
      </Button>
    </div>
  )
}

export default AddToCartForm