import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react";


type Props = {
  value: number
  onChange: (value: number) => void;
  isDisabled: boolean; 
}


export const AmmountInput = ({
  value,
  onChange,
  isDisabled,
}: Props) => {

  const increaseQuantity = () => {
    onChange(value + 1);
  }

  const decreaseQuantity = () => {
    if (value === 1) return;
    onChange(value - 1);
  }

  return (
    <div className="flex flex-row">
      <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          disabled={isDisabled || value === 1}
          type="button"
          >
        <MinusIcon className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min={1}
          max={99}
          className={cn(
            "w-20 text-center mx-2",
          )}
          value={value}
          readOnly
        />
        <Button
          variant="outline"
          size="icon"
          onClick={increaseQuantity}
          disabled={isDisabled}
          type="button"
          >
          <PlusIcon className="h-4 w-4" />
        </Button>
    </div>
  )
}