
import React from 'react';
import { Product } from '../../../types';
import { Image } from '../../atoms/Image/Image';
import { Price } from '../../atoms/Price/Price';
import { Button } from '../../atoms/Button/Button';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addToCart } from '../../../store/slices/cartSlice';
import { Heart, ShoppingBag } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0], // Default to first available size
      color: product.colors[0] // Default to first available color
    }));
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.name}
          aspectRatio="portrait"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 
          className="font-medium text-gray-900 dark:text-gray-100 mb-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          onClick={() => onQuickView?.(product)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
        <Price amount={product.price} size="md" />
        
        <div className="mt-2 flex gap-1">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
