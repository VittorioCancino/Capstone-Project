import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { GetAllMaterials } from "../../api/MaterialApi";
import { GetAllTypes } from "../../api/TypeApi";

interface Stores {
    Id: number;
    Name: string;
}

interface AllStoresProps {
    filter: (filterValue: string) => void;
}

const AllStores: React.FC<AllStoresProps> = ({ filter }) => {

    const [stores, setStores] = useState<Stores[]>([]);

    const { data, error, isError, isLoading } = useQuery(
        "stores",
        GetAllTypes,
        {
            onSuccess: (data) => {
                setStores(data.data);
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
                Bodegas
            </h4>
            <ul className="space-y-1 text-left w-full">
                {stores.map((store) => (
                    <li
                        key={store.Id}
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                        onClick={() => filter(store.Name)}
                    >
                        {store.Name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllStores;
