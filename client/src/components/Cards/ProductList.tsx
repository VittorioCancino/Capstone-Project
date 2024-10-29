import React, { useState } from "react";

interface Product {
  Id: number;
  Material: number;
  Type: number;
  Large: number;
  Width: number;
  Thickness: number;
  Quantity: number;
  MaterialInfoId: number; // Cambiado de 'MaterialInfo.Id'
  MaterialInfoName: string; // Cambiado de 'MaterialInfo.Name'
  TypeInfoId: number; // Cambiado de 'TypeInfo.Id'
  TypeInfoName: string; // Cambiado de 'TypeInfo.Name'
}

const ProductList = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        {products.map((product) => (
          <div
            key={product.Id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-md"
          >
            <span className="text-gray-700">ID: {product.Id}</span>
            <span className="text-black-700">
              SKU: {product.MaterialInfoName}
              {product.TypeInfoName}
              {product.Large}x{product.Width}cm{product.Thickness}mc
            </span>
            <span className="text-gray-700">
              Existencias: {product.Quantity}
            </span>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => openModal(product)}
            >
              Ver detalle
            </button>
          </div>
        ))}
      </div>
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              SKU: {selectedProduct.MaterialInfoName}
              {selectedProduct.TypeInfoName}
              {selectedProduct.Large}x{selectedProduct.Width}cm
              {selectedProduct.Thickness}mc
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
              <li>ID del Producto: {selectedProduct.Id}</li>
              <li>Material: {selectedProduct.MaterialInfoName}</li>
              <li>Tipo: {selectedProduct.TypeInfoName}</li>
              <li>Largo: {selectedProduct.Large} cm</li>
              <li>Ancho: {selectedProduct.Width} cm</li>
              <li>Grosor: {selectedProduct.Thickness} mm</li>
              <li>Existencias: {selectedProduct.Quantity}</li>
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
