import { useState } from "react";


import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { MinusIcon, PlusIcon } from "lucide-react";


type Props = {
  value: number
  quantity: number
  setQuantity: (quantity: number) => void;
  isDisabled: boolean; 
}


export const AmmountInput = ({
  value,
  quantity,
  setQuantity,
  isDisabled,
}: Props) => {

  const {...field} = {
    value: quantity
  }


  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1);
  }

  
  const quantitySchema = z.number()
  .min(1, "Quantity must be at least 1")
  .max(99, "Quantity cannot exceed 99")
  .int("Quantity must be a whole number");
  
  console.log(value)


  return (
    <div className="flex flex-row">
      <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          disabled={isDisabled}
          >
        <MinusIcon className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          min={1}
          max={99}
          className={cn(
            "w-20 text-center mx-2",
          )}
          readOnly
        />
        <Button
          variant="outline"
          size="icon"
          onClick={increaseQuantity}
          disabled={isDisabled}
          >
          <PlusIcon className="h-4 w-4" />
        </Button>
    </div>
  )
}