import { auth } from '@/auth';
import CartButton from '@/components/cart/CartButton';


const Cart = async () => {
  const session = await auth();
  if (session) {
    const userId = 'FAKE_USER_ID'
    //TODO: Call hook to fetch userId and pass it to CartButton 
    return (
      <CartButton userId={userId} />
    )
  }

  return (
    <CartButton userId={undefined} />
  )};

export default Cart;