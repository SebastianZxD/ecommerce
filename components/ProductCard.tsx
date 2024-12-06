'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { useState } from 'react';
import { CloudAlertIcon, ScanSearch } from 'lucide-react';
import { Button } from './ui/button';
import { useOpenProduct } from '@/features/products/hooks/use-open-product';


interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product} : ProductCardProps): JSX.Element => {

 
  const { id } = product
  const { onOpen } = useOpenProduct();

  const [imageError, setImageError] = useState(false);
  return (
    <div className="group relative rounded-lg border p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden rounded-lg">
      {imageError ? (
          <div className="w-full h-full flex items-center justify-center">
            <CloudAlertIcon className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <Image
            src={product.imageURL || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
        <Button onClick={() => onOpen(id)}>
          View <ScanSearch className='size-4 ml-2'/>
        </Button>
      </div>
    </div>
  );
}