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
  MaterialInfoId: number; // Cambiado de 'MaterialInfo.Id'
  MaterialInfoName: string; // Cambiado de 'MaterialInfo.Name'
  TypeInfoId: number; // Cambiado de 'TypeInfo.Id'
  TypeInfoName: string; // Cambiado de 'TypeInfo.Name'
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
                onClick={() => openUpdate(true)}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Aumentar existencias
              </button>
              <button
                onClick={() => openUpdate(false)}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Reducir existencias
              </button>
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
      {showUpdate && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {selectedAction === true
                ? "¿Cuanto desea agregar a las existencias?"
                : "¿Cuanto desea reducir de las existencias?"}
            </h2>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Ingrese la cantidad"
              className="block w-full mt-2 p-2 border border-gray-300 rounded"
            />
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700"></ul>
            <div className="flex justify-end space-x-4">
              {selectedAction === true ? (
                <button
                  onClick={() => {
                    const updater = {
                      Material: selectedProduct.MaterialInfoName,
                      Type: selectedProduct.TypeInfoName,
                      Large: selectedProduct.Large,
                      Width: selectedProduct.Width,
                      Thickness: selectedProduct.Thickness,
                      Quantity: quantity,
                    };
                    handleUpdateQuantity(updater);
                    closeUpdate();
                    closeModal();
                  }}
                  className="ml-4 px-4 py-2 text-black rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Agregar
                </button>
              ) : (
                <button
                  onClick={() => {
                    const updater = {
                      Material: selectedProduct.MaterialInfoName,
                      Type: selectedProduct.TypeInfoName,
                      Large: selectedProduct.Large,
                      Width: selectedProduct.Width,
                      Thickness: selectedProduct.Thickness,
                      Quantity: -quantity,
                    };
                    handleUpdateQuantity(updater);
                    closeUpdate();
                    closeModal();
                  }}
                  className="ml-4 px-4 py-2 text-black rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Reducir
                </button>
              )}

              <button
                onClick={closeUpdate}
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
