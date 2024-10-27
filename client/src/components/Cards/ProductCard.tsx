import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ Id, Image, Title, Available, Inventory, MinStock, LastRestock }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img src={Image} alt={Title} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{Title}</h3>
        <p className="text-sm text-gray-600">Disponible para venta: {Available}</p>
        <p className="text-sm text-gray-600">Cantidad en inventario: {Inventory}</p>
        <p className="text-sm text-gray-600">Stock mínimo: {MinStock}</p>
        <p className="text-sm text-gray-600">Último reabastecimiento: {LastRestock}</p>
        <Link 
          to={`/product/${Id}`}
          className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
