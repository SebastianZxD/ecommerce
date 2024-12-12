import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react';

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

const CartItem = (cartItem: ICartItem) => {
  const {id, imageURL, name, description, price, quantity} = cartItem;

  if (!cartItem) {
    <div>
      Failed to load cart Items, please reload the page or contact us
    </div>
  }

  
  return (
    <div className='flex flex-col'>
      <Card className="flex flex-row items-center p-4">
        <div className="relative h-24 w-24 rounded-md overflow-hidden">
          <Image
            src={imageURL || '/placeholder.png'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="flex-1 ml-4">
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500 line-clamp-1">
            {description}
          </CardDescription>
          <div className="mt-2 font-semibold">
            ${price?.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="outline" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CartItem