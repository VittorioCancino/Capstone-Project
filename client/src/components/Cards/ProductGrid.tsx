import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((Product,index) => (
        <ProductCard key={index} {...Product} />
      ))}
    </div>
  );
};

export default ProductGrid;
