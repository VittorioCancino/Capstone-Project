import React, { useState } from "react";
import { AddStock, RemoveStock } from "../../api/ProductApi";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { toast } from "react-toastify";
import { GetAllWarehouses } from "../../api/WarehouseApi";

interface Area {
  Id: number;
  Name: string;
  WarehouseId: number;
}

interface Store {
  Id: number,
  Name: string,
  Address: String,
  Manager: String,
  Phone: String,
  Email: String,
  Schedule: String
}


const AreasInfo = ({ areas }) => {

  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Area | null>(null);
  const [selectedAction, setSelectedAction] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [filter, setFilter] = useState(null);


  const queryClient = useQueryClient();

  const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const { data: storesData, error: storesError, isError: isStoresError, isLoading: isStoresLoading, } = useQuery(
    "stores",
    GetAllWarehouses,
    {
      onSuccess: (data) => {
        setStores(data.data);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-2">
        {areas
          .sort((a, b) => a.Id - b.Id)
          .map((product) => (
            <div
              key={product.Id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-md"
            >
              <span className="text-gray-700 w-20">ID: {product.Id}</span>
              <span className="text-black-700 w-64">
                Area: {product.Name}
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
              Area: {selectedProduct.Name}
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
              <li>Bodega: {stores.find((store) => store.Id === selectedProduct.WarehouseId)?.Name}</li>
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

export default AreasInfo;
