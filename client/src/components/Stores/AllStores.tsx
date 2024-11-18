import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { GetAllWarehouses } from "../../api/WarehouseApi";

interface Stores {
    Id: number,
    Name: string,
    Address: String,
    Manager: String,
    Phone: String,
    Email: String,
    Schedule: String
}

interface AllStoresProps {
    filter: (filterValue: string) => void;
}

const AllStores: React.FC<AllStoresProps> = ({ filter }) => {

    const [stores, setStores] = useState<Stores[]>([]);

    const { data, error, isError, isLoading } = useQuery(
        "stores",
        GetAllWarehouses,
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
