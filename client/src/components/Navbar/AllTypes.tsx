import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { GetAllTypes } from "../../api/TypeApi";

interface Type {
  Id: number;
  Name: string;
}

const AllMateriales = () => {
  const [materials, setMaterials] = useState<Type[]>([]);

  const { data, error, isError, isLoading } = useQuery("types", GetAllTypes, {
    onSuccess: (data) => {
      setMaterials(data.data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

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
            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          >
            {material.Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMateriales;
