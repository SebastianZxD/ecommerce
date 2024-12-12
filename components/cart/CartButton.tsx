
'use client'

import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/features/cart/hooks/use-cart-store';
import useStore from '@/features/cart-items/hooks/useStore';



const CartButton = ({ userId }: { userId: string | undefined }) => {
  const { onCartOpen } = useCartStore();
  

  return (
    <Button
      variant="outline"
      size="icon"
      className="font-normal bg-white/10 hover:bg-white/20 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition relative border-white border-2"
      onClick={onCartOpen}
    > 
      <div className='absolute -bottom-3 -left-3 rounded-md border-2 border-white size-6 bg-purple-300 text-black'>
        <span className=''>{'0'}</span>
      </div>
      <ShoppingCart />
    </Button>
  )
}

export default CartButton
