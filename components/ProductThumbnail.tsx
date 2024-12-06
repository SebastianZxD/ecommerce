'use client';

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { CloudAlertIcon, TagIcon } from "lucide-react";

type Props = {
  name: string | undefined
  price: Number | undefined
  discount: {
    percentage: Number
  } | undefined
  isNew: Boolean | undefined
  imageURL: string | null | undefined
}

const ProductThumbnail = ({ 
  name, 
  price, 
  discount={percentage: 20}, 
  isNew = true, 
  imageURL 
}:Props) => {

  const [imageError, setImageError] = useState(false);

  const percentage = 20;

  const calculateDiscountedPrice = () => {
    if (!price || !discount) return price;
    const discountAmount = Number(price) * (Number(discount.percentage) / 100);
    return Number(price) - discountAmount;
  };
  
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="border-none relative">
      <CardHeader className="absolute z-10 right-2 top-2 p-0">
          {isNew && (
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 
                          px-3 py-1 rounded-full 
                          shadow-lg 
                          backdrop-blur-sm
                          transform hover:scale-105 transition-transform
                          border border-white/20">
              <span className="text-xs font-semibold text-white">
                NEW
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex justify-center p-0">
        {imageError ? (
          <div className="w-[400px] h-[400px] flex items-center justify-center">
            <CloudAlertIcon className="w-48 h-48 text-gray-400 " />
          </div>
        ) : (
          <div className="">
            <div className="relative w-[400px] h-[400px]">
              <Image
                src={imageURL || '/placeholder.png'}
                alt={name!}
                fill
                className="object-cover rounded-md"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
          </div>
        )}
        </CardContent>
        <CardFooter className="flex justify-between p-0">
        {discount && (
            <div className="flex items-center gap-2 justify-around">
              <div className="flex flex-col">
                <div className="w-[400px] h-[40px] bg-gradient-to-r from-rose-400 to-red-500 px-3 py-1 rounded-md shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1 justify-center">
                <TagIcon className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">
                  {`-${discount.percentage}%`}
                </span>
              </div>
              <div className="w-[400px] h-[40px] border-2 border-black/20 flex items-center gap-1 justify-center rounded-md mt-2 bg-green-500/30">
                <span className="text-sm line-through text-gray-500">
                    {`${Number(price).toFixed(2)}`}
                </span>
                <span className="text-lg font-bold text-green-600">
                  {`${calculateDiscountedPrice()?.toFixed(2)} COP`}
                </span>
              </div>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProductThumbnail

