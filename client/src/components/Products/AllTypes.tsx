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

interface AllTypesProps {
  filter: (filterValue: { GroupInfoName?: string }) => void;
}

const AllTypes: React.FC<AllTypesProps> = ({ filter }) => {

  const [types, setTypes] = useState<Type[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (id: number, name: string) => {
    setSelectedId(id);
    filter({ GroupInfoName: name });
  };

  const { data, error, isError, isLoading } = useQuery("types", GetAllTypes, {
    onSuccess: (data) => {
      setTypes(data.data);
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
        Tipo de producto
      </h4>
      <ul className="space-y-1 text-left w-full">
        {types.map((type) => (
          <li
            key={type.Id}
            className={`cursor-pointer px-2 py-1 rounded ${selectedId === type.Id ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            onClick={() => handleClick(type.Id, type.Name)}
          >
            {type.Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTypes;
