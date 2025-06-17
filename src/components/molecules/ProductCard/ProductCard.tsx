
import React from 'react';
import { Product } from '../../../types';
import { Image } from '../../atoms/Image/Image';
import { Price } from '../../atoms/Price/Price';
import { Button } from '../../atoms/Button/Button';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addToCart } from '../../../store/slices/cartSlice';
import { Heart, ShoppingBag } from 'lucide-react';
import styles from './ProductCard.module.scss';

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
      size: product.sizes[0],
      color: product.colors[0]
    }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          aspectRatio="portrait"
          className={styles.image}
        />
        
        <div className={styles.overlay}>
          <div className={styles.actions}>
            <button className={styles.favoriteButton}>
              <Heart className={styles.favoriteIcon} />
            </button>
          </div>
          
          <div className={styles.addToCartContainer}>
            <Button
              onClick={handleAddToCart}
              className={styles.addToCartButton}
              size="sm"
            >
              <ShoppingBag className={styles.addToCartIcon} />
              Add to Cart
            </Button>
          </div>
        </div>
        
        {!product.inStock && (
          <div className={styles.outOfStock}>
            <span className={styles.outOfStockText}>Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 
          className={styles.title}
          onClick={() => onQuickView?.(product)}
        >
          {product.name}
        </h3>
        <p className={styles.category}>{product.category}</p>
        <Price amount={product.price} size="md" />
        
        <div className={styles.colors}>
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={styles.colorSwatch}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
