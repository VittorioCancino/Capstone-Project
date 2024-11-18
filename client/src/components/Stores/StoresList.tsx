import React from "react";
import StoresInfo from "./StoresInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import AllStores from "./AllStores";
import { CreateWarehouse } from "../../types";
import { CreateWarehouses, GetAllWarehouses, RemoveWarehouses } from "../../api/WarehouseApi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import AddDeleteButton from "./AddDeleteButton";

interface Store {
  Id: number,
  Name: String,
  Address: String,
  Manager: String,
  Phone: String,
  Email: String,
  Schedule: String
}

const StoreList = () => {

  const queryClient = useQueryClient();

  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState(null);
  const [store, setStore] = useState<Store[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [addOrDelete, setAddOrDelete] = useState("");

  const initialValuesType: CreateWarehouse = {
    WarehouseName: "",
    WarehouseAdress: "",
    WarehouseManager: "",
    WarehousePhone: "",
    WarehouseEmail: "",
    WarehouseSchedule: ""
  };

  const {
    register: registerType,
    formState: { errors: errorsType },
    handleSubmit: handleSubmitType,
    reset: resetType,
  } = useForm<CreateWarehouse>({ defaultValues: initialValuesType });

  const { data, error, isError, isLoading } = useQuery(
    "stores",
    GetAllWarehouses,
    {
      onSuccess: (data) => {
        setStore(data.data);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredStores = filter
    ? store.filter((store) => store.Name === filter)
    : store;

  return (
    <>
      <div>
        <h1 className="text-4xl underline text-center mt-6">Bodegas</h1>
        <div className="relative mt-8 mb-8">
          <div className="flex items-center space-x-4">
            {/* Botón Filtrar */}
            <div className="relative">


              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute left-0 mt-2 w-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                  <div className="justify-between">
                    <AllStores filter={handleFilterClick} />
                    <div className="flex flex-col items-start space-y-2 whitespace-nowrap">
                      <h4
                        className="font-semibold text-gray-700 underline mt-4 cursor-pointer hover:bg-gray-100 py-1 rounded"
                        onClick={() => handleFilterClick("")}
                      >
                        Limpiar Filtro
                      </h4>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <AddDeleteButton />
          </div>
        </div>
        <StoresInfo stores={filteredStores} />



      </div>



    </>
  );
};

export default StoreList;
