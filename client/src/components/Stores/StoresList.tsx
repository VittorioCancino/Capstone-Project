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
            <AddDeleteButton />
          </div>
        </div>
        <StoresInfo stores={filteredStores} />



      </div>



    </>
  );
};

export default StoreList;
