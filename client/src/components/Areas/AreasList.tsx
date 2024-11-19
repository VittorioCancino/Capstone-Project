import React from "react";
import AreasInfo from "./AreasInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import AllAreas from "./AllAreas";
import { CreateArea } from "../../types";
import { CreateAreas, GetAllAreas, RemoveAreas } from "../../api/AreaApi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import AddDeleteButton from "./AddDeleteButton";


interface Area {
  Name: string;
  WName: string;
}

const AreaList = () => {

  const queryClient = useQueryClient();

  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState(null);
  const [area, setArea] = useState<Area[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [addOrDelete, setAddOrDelete] = useState("");

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredAreas = filter
    ? area.filter((area) => area.Name === filter)
    : area;

  return (
    <>
      <div>
        <h1 className="text-4xl underline text-center mt-6">Areas</h1>
        <div className="relative mt-8 mb-8">
          <div className="flex items-center space-x-4">
            <AddDeleteButton />
          </div>
        </div>
        <AreasInfo areas={filteredAreas} />
      </div>



    </>
  );
};

export default AreaList;

