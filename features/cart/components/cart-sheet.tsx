import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import CartItem from '@/components/cart/CartItem';


type Props = {
  cartId: string | undefined;
  cartItems: Array<ICartItem> | [];
  isLoading: boolean;
}

type ICartItem = {
  quantity: number;
  cartItemId: string;
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageURL: string | null;
  createdAt: string;
}



const CartSheet = ({
  cartId,
  cartItems,
  isLoading 
}: Props) => {

  const { toast } = useToast();
  const router = useRouter();

  console.log(cartId)

  // if (!cartItems.length) {
  //   return (
  //     <Sheet open={open} onOpenChange={onOpenChange}>
  //       <SheetContent className="space-y-4">
  //         <div className='relative h-full'>
  //           <SheetHeader>
  //             <SheetTitle>
  //               Your cart is currently Empty...
  //             </SheetTitle>
  //             <SheetDescription>
  //               try adding some items to your cart!
  //             </SheetDescription>
  //           </SheetHeader>
  //         </div>
  //       </SheetContent>
  //     </Sheet>
  //   )
  // } 


  
  return (
    <>
        {isLoading ?
          (
            <div className='relative h-full'>
              <SheetHeader>
                <SheetTitle>
                  <Skeleton className='w-48 h-10'/>
                  Loading Cart...
                </SheetTitle>
                <SheetDescription>
                  ...
                  <Skeleton className='w-48 h-10'/>
                </SheetDescription>
              </SheetHeader>
            </div>
          ) : (
            <div className='relative h-full'>
              <SheetHeader>
                <SheetTitle>
                  Cart Items
                </SheetTitle>
                <SheetDescription>
                  Let's take a look on what you have added so far...
                </SheetDescription>\
                {cartItems.length &&
                  cartItems.map((item) =>
                    <CartItem key={item.cartItemId} {...item} />
                  )
                }
              </SheetHeader>
            </div>
          )
        }
    </>
  )
}

export default CartSheet