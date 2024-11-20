import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import AddDeleteButton from "./AddDeleteButton";
import { GetAllMaterials } from "../../api/MaterialApi";
import MaterialInfo from "./MaterialInfo";

interface Material {
  Name: string;
}

const MaterialList = () => {

  const queryClient = useQueryClient();

  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState(null);
  const [Material, setMaterial] = useState<Material[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [addOrDelete, setAddOrDelete] = useState("");

  const { data, error, isError, isLoading } = useQuery(
    "materials",
    GetAllMaterials,
    {
      onSuccess: (data) => {
        setMaterial(data.data);
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

  const filteredMaterials = filter
    ? Material.filter((Material) => Material.Name === filter)
    : Material;

  return (
    <>
      <div>
        <h1 className="text-4xl underline text-center mt-6">Materiales</h1>
        <div className="relative mt-8 mb-8">
          <div className="flex items-center space-x-4">
            <AddDeleteButton />
          </div>
        </div>
        <MaterialInfo materials={filteredMaterials} />
      </div>



    </>
  );
};

export default MaterialList;

