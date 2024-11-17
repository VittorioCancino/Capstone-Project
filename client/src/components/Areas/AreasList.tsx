import React from "react";
import AreasInfo from "./AreasInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { GetAllMaterials } from "../../api/MaterialApi";
import AllAreas from "./AllAreas";
import { string } from "zod";

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

interface Areas {
  Id: number;
  Name: string;
}

const SampleCards = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState(null);
  const [areas, setAreas] = useState<Areas[]>([]);

  const { data, error, isError, isLoading } = useQuery(
    "areas",
    GetAllMaterials,
    {
      onSuccess: (data) => {
        setAreas(data.data);
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

  const filteredAreas = filter
    ? areas.filter((area) => area.Name === filter)
    : areas;

  return (
    <div>
      <h1 className="text-4xl underline text-center mt-6">Areas</h1>
      <div className="relative mt-8 mb-8">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none"
        >
          Filtrar
          <span className="ml-2">▼</span>
        </button>

        {showDropdown && (
          <div className="absolute left-0 mt-2 w-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4">
            <div className="justify-between">
              <AllAreas filter={handleFilterClick} />
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
      <AreasInfo products={filteredAreas} />
    </div>
  );
};

export default SampleCards;
