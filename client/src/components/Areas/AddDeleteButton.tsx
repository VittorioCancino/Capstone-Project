import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { CreateArea, DeleteArea } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { CreateAreas, GetAllAreas, RemoveAreas } from "../../api/AreaApi";
import { GetAllWarehouses } from "../../api/WarehouseApi";


interface Areas {
    Id: number,
    Name: string,
    WName: string,
    WarehouseId: number
}

interface Store {
    Id: number,
    Name: string,
    Address: String,
    Manager: String,
    Phone: String,
    Email: String,
    Schedule: String
}


const AddDeleteButton = () => {

    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [areaName, setareaName] = useState("");
    const [areaWName, setareaWName] = useState("");
    const [areaWId, setareaWId] = useState(0);
    const [stores, setStores] = useState<Store[]>([]);
    const [addOrDelete, setAddOrDelete] = useState("");
    const [areas, setareas] = useState<Areas[]>([]);

    const initialValuesArea: CreateArea = {
        WarehouseName: "",
        AreaName: "",
    };

    const initialValuesAreaD: DeleteArea = {
        WarehouseName: "",
        AreaName: "",
    };

    const {
        register: registerWarehouse,
        formState: { errors: errorsWare },
        handleSubmit: handleSubmitWarehouse,
        reset: resetArea,
    } = useForm<CreateArea>({ defaultValues: initialValuesArea });

    const {
        register: registerWarehouseD,
        formState: { errors: errorsWareD },
        handleSubmit: handleSubmitWarehouseD,
        reset: resetAreaD,
    } = useForm<DeleteArea>({ defaultValues: initialValuesAreaD });

    const { mutate: mutateArea } = useMutation(CreateAreas, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("areas");
            toast.success("Bodega creado exitosamente");
            resetArea();
        },
    });

    const { mutate: mutateAreaR } = useMutation(RemoveAreas, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("areas");
            toast.success("Bodega eliminado exitosamente");
            resetAreaD();
        },
    });

    const handleAddOrDelete = (choiceValue) => {
        setAddOrDelete(choiceValue);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setareaName("");
    };

    const handleAddSubmit = () => {
        const formData: CreateArea = {
            WarehouseName: areaWName,
            AreaName: areaName
        };
        mutateArea(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {
        const formData: DeleteArea = {
            WarehouseName: stores.find((store) => store.Id === areaWId)?.Name ?? "Nombre no disponible",
            AreaName: areaName
        };
        console.log(formData);
        mutateAreaR(formData);
        closeModal();
    };

    const handleNameChange = (event) => setareaName(event.target.value);
    const handleWNameChange = (event) => setareaWName(event.target.value);
    const handleWNameChange2 = (value) => {
        setareaWName(value);
    };
    const handleNameChange2 = (value) => {
        setareaName(value);
    };

    const { data: areasData, error: areasError, isError: isAreasError, isLoading: isAreasLoading, } = useQuery(
        "areas",
        GetAllAreas,
        {
            onSuccess: (data) => {
                setareas(data.data);
            },
            onError: (error: Error) => {
                toast.error(error.message);
            },
        }
    );

    const { data: storesData, error: storesError, isError: isStoresError, isLoading: isStoresLoading, } = useQuery(
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


    return (
        <>
            {/* Botón Agregar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Agregar");
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
                Crear nueva area
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar area
            </button>
            {showModal && addOrDelete === "Agregar" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Nombre del area:</span>
                            <input
                                type="text"
                                value={areaName}
                                onChange={handleNameChange}
                                placeholder={``}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700 block mt-6">Bodega del area:</span>
                            <select
                                value={areaWName}
                                onChange={(e) => setareaWName(e.target.value)}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione una bodega:</option>
                                {stores.map((store) => (
                                    <option
                                        key={store.Id}
                                        value={store.Name}
                                    >
                                        {store.Name}
                                    </option>
                                ))}
                            </select>
                        </label>


                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {"Agregar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showModal && addOrDelete === "Eliminar" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Nombre del area:</span>
                            <select
                                value={areaName}
                                onChange={(e) => {
                                    const selectedArea = areas.find((area) => area.Name === e.target.value)?.WarehouseId ?? 0;
                                    setareaName(e.target.value);
                                    setareaWId(selectedArea);
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un área:</option>
                                {areas.map((area) => (
                                    <option key={area.Id} value={area.Name}>
                                        {area.Name}
                                    </option>
                                ))}
                            </select>
                        </label>


                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {"Eliminar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default AddDeleteButton;