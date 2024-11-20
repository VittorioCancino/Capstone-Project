import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { GetAllMaterials } from "../../api/MaterialApi";

interface Material {
  Id: number;
  Name: string;
}

interface AllMaterialsProps {
  filter: (filterValue: { MaterialInfoName?: string }) => void;
}

const AllMateriales: React.FC<AllMaterialsProps> = ({ filter }) => {

  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);


  const handleClick = (id: number, name: string) => {
    setSelectedId(id);
    filter({ MaterialInfoName: name });
  };

  const { data, error, isError, isLoading } = useQuery(
    "materials",
    GetAllMaterials,
    {
      onSuccess: (data) => {
        setMaterials(data.data);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
      <h4 className="font-semibold text-gray-700 underline mb-2">
        Tipo de Material
      </h4>
      <ul className="space-y-1 text-left w-full">
        {materials.map((material) => (
          <li
            key={material.Id}
            className={`cursor-pointer px-2 py-1 rounded ${selectedId === material.Id ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            onClick={() => handleClick(material.Id, material.Name)}
          >
            {material.Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMateriales;
