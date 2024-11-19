import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { GetAllAreas } from "../../api/AreaApi";
import { toast } from "react-toastify";

interface Store {
  Id: number,
  Name: string,
  Address: String,
  Manager: String,
  Phone: String,
  Email: String,
  Schedule: String
}

interface Areas {
  Id: number,
  Name: string,
  WName: string,
  WarehouseId: number
}

const StoresInfo = ({ stores }) => {

  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [areas, setArea] = useState<Areas[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [filter, setFilter] = useState(null);

  const openModal = (store) => {
    setShowModal(true);
    setSelectedStore(store);
    setFilter(store.Id);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedStore(null);
  };

  const { data, error, isError, isLoading } = useQuery(
    "areas",
    GetAllAreas,
    {
      onSuccess: (data) => {
        setArea(data.data);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredStores = filter
    ? areas.filter((areas) => areas.WarehouseId === filter)
    : areas;


  return (
    <>
      <div className="flex flex-col space-y-2">
        {stores
          .sort((a, b) => a.Id - b.Id)
          .map((store) => (
            <div
              key={store.Id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-md"
            >
              <span className="text-gray-700 w-20">ID: {store.Id}</span>
              <span className="text-black-700 w-64">
                Bodega: {store.Name}
              </span>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => openModal(store)}
              >
                Ver detalle
              </button>
            </div>
          ))}
      </div>
      {showModal && selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              Bodega: {selectedStore.Name}
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
              <li>ID de la bodega: {selectedStore.Id}</li>
              <li>Dirección: {selectedStore.Address}</li>
              <li>Manager: {selectedStore.Manager}</li>
              <li>Número telefónico: {selectedStore.Phone}</li>
              <li>Email: {selectedStore.Email}</li>
              <li>Horarios: {selectedStore.Schedule}</li>
              <li>Areas:</li>
              <ul className="list-decimal pl-10 space-y-2 mb-4 text-gray-700 ">
                {areas.map((area) => (
                  <li
                    key={area.Id}
                    className="list-decimal cursor-pointer px-2 py-1 rounded"
                  >
                    {area.Name}
                  </li>
                ))}
              </ul>
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoresInfo;
