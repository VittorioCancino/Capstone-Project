import React, { useState } from "react";
import { AddStock, RemoveStock } from "../../api/ProductApi";
import { useMutation, useQueryClient } from "react-query";

interface Product {
  Id: number;
  Material: number;
  Type: number;
  Large: number;
  Width: number;
  Thickness: number;
  Quantity: number;
  MaterialInfoName: string; // Cambiado de 'MaterialInfo.Name'
  GroupInfoName: string; // Cambiado de 'TypeInfo.Name'
}

const ProductList = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedAction, setSelectedAction] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const queryClient = useQueryClient();

  const { mutate: mutateAdd } = useMutation(AddStock, {
    onSuccess: (updater) => {
      queryClient.invalidateQueries("products");
      setSelectedProduct((prev) => ({
        ...prev,
        ...updater,
      }));
    },
  });

  const { mutate: mutateRemove } = useMutation(RemoveStock, {
    onSuccess: (updater) => {
      queryClient.invalidateQueries("products");
      setSelectedProduct((prev) => ({
        ...prev,
        ...updater,
      }));
    },
  });

  const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const openUpdate = (action) => {
    setShowUpdate(true);
    setSelectedAction(action);
  };
  const closeUpdate = () => {
    setShowUpdate(false);
  };

  const handleUpdateQuantity = (updater) => {
    {
      selectedAction ? mutateAdd(updater) : mutateRemove(updater);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        {products
          .sort((a, b) => a.Id - b.Id)
          .map((product) => (
            <div
              key={product.Id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-md"
            >
              <span className="text-gray-700">ID: {product.Id}</span>
              <span className="text-black-700">
                SKU: {product.MaterialInfoName} {product.GroupInfoName} {product.Large}cm x {product.Width}cm x {product.Thickness}mc
              </span>
              <span className="text-gray-700">
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
              {selectedProduct.GroupInfoName}
              {selectedProduct.Large}cm x {selectedProduct.Width}cm x
              {selectedProduct.Thickness}mc
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
              <li>ID del Producto: {selectedProduct.Id}</li>
              <li>Material: {selectedProduct.MaterialInfoName}</li>
              <li>Tipo: {selectedProduct.GroupInfoName}</li>
              <li>Largo: {selectedProduct.Large} cm</li>
              <li>Ancho: {selectedProduct.Width} cm</li>
              <li>Grosor: {selectedProduct.Thickness} mm</li>
            </ul>
            <div className="flex justify-end space-x-4">

              <button
                onClick={closeModal}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
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
