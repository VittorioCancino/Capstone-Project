import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { GetAllMaterials } from "../../api/MaterialApi";

interface Areas {
    Id: number;
    Name: string;
}

interface AllareasProps {
    filter: (filterValue: string) => void;
}

const AllAreas: React.FC<AllareasProps> = ({ filter }) => {

    const [areas, setareas] = useState<Areas[]>([]);

    const { data, error, isError, isLoading } = useQuery(
        "areas",
        GetAllMaterials,
        {
            onSuccess: (data) => {
                setareas(data.data);
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
                Areas
            </h4>
            <ul className="space-y-1 text-left w-full">
                {areas.map((area) => (
                    <li
                        key={area.Id}
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                        onClick={() => filter(area.Name)}
                    >
                        {area.Name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllAreas;
