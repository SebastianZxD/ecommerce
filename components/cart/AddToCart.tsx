import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGetCart } from '@/features/cart/api/use-get-cart';
import { useGetCartItems } from '@/features/cart-items/api/use-get-cart-items';
import { useCreateCart } from '@/features/cart/api/use-create-cart';
import { useOpenProduct } from '@/features/products/hooks/use-open-product';



import { Button } from '@/components/ui/button'

import { 
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';

import { CartItemSchema } from '@/prisma/generated/zod';
import { AmmountInput } from '@/components/cart/AmmountInput';

const formSchema = CartItemSchema.pick({
  quantity: true,
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
    defaultValues: {
      quantity: 1,
    },
  })

  const [quantity, setQuantity] = useState<number>(1);
  const product = productData;
  const { onClose } = useOpenProduct();
  const cartQuery = useGetCart(cartId);
  const cartDatabaseId = cartQuery.data?.id;
  const cartItemsQuery = useGetCartItems(cartId);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const isDisabled = isCreatingCart || cartItemsQuery.isLoading;
  const mutation = useCreateCart();
 
  const createCartInDatabase = useCreateCart();

  

  const handleSubmit = (values: FormValues) => {
    console.log(values)
    onSubmit(values);
  }


  return (
    <div className='flex'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='flex'>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                    <FormControl>
                      <AmmountInput 
                        value={field.value} 
                        onChange={field.onChange} isDisabled={isDisabled}  
                      />
                    </FormControl>
                  </FormItem>
              )}
              />
              <Button
                disabled={form.watch("quantity") <= 0 || isDisabled}
                variant="default"
                className="flex-1"
                type='submit'
                >
                Add to Cart
                <ShoppingCart className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>    
      </Form>
    </div>  
  )
}

export default AddToCartForm