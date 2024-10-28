import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";

export default function AddButton() {
  const [showModal, setShowModal] = useState(false);
  const [addOption, setAddOption] = useState("");
  const [productName, setProductName] = useState("");

  const queryClient = useQueryClient();

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setAddOption("");
    setProductName("");
  };
  const handleAddOptionChange = (event) => setAddOption(event.target.value);
  const handleNameChange = (event) => setProductName(event.target.value);

  const handleAddSubmit = () => {
    console.log(`Agregar: ${addOption} con nombre: ${productName}`);
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Agregar
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Agregar Elemento</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Seleccione qué agregar:</span>
              <select
                value={addOption}
                onChange={handleAddOptionChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Seleccione una opción...
                </option>
                <option value="Producto">Producto</option>
                <option value="Tipo de Producto">Tipo de Producto</option>
                <option value="Material de Producto">
                  Material de Producto
                </option>
              </select>
            </label>

            {addOption && (
              <label className="block mb-4">
                <span className="text-gray-700">Nombre:</span>
                <input
                  type="text"
                  value={productName}
                  onChange={handleNameChange}
                  placeholder={`Ingrese el nombre del ${addOption.toLowerCase()}`}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
