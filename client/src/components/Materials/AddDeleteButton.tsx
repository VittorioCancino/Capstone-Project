import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { CreateType } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { GetAllWarehouses } from "../../api/WarehouseApi";
import { CreateTypes, RemoveTypes, GetAllTypes } from "../../api/TypeApi";


interface Group {
    Id: number;
    Name: string;
}

const AddDeleteButton = () => {

    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [addOrDelete, setAddOrDelete] = useState("");
    const [groups, setGroups] = useState<Group[]>([]);

    const initialValuesGroup: CreateType = {
        GroupName: "",
    };

    const initialValuesGroupD: CreateType = {
        GroupName: ""
    };

    const {
        register: registerWarehouse,
        formState: { errors: errorsWare },
        handleSubmit: handleSubmitWarehouse,
        reset: resetGroup,
    } = useForm<CreateType>({ defaultValues: initialValuesGroup });

    const {
        register: registerWarehouseD,
        formState: { errors: errorsWareD },
        handleSubmit: handleSubmitWarehouseD,
        reset: resetGroupD,
    } = useForm<CreateType>({ defaultValues: initialValuesGroupD });

    const { mutate: mutateGroup } = useMutation(CreateTypes, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("groups");
            toast.success("Bodega creado exitosamente");
            resetGroup();
        },
    });

    const { mutate: mutateGroupR } = useMutation(RemoveTypes, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("groups");
            toast.success("Bodega eliminado exitosamente");
            resetGroupD();
        },
    });

    const handleAddOrDelete = (choiceValue) => {
        setAddOrDelete(choiceValue);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setGroupName("");
    };

    const handleAddSubmit = () => {
        const formData: CreateType = {
            GroupName: groupName
        };
        mutateGroup(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {
        const formData: CreateType = {
            GroupName: groupName,
        };
        console.log(formData);
        mutateGroupR(formData);
        closeModal();
    };

    const handleNameChange = (event) => setGroupName(event.target.value);
    const handleNameChange2 = (value) => {
        setGroupName(value);
    };

    const { data: GroupsData, error: GroupsError, isError: isGroupsError, isLoading: isGroupsLoading, } = useQuery(
        "groups",
        GetAllTypes,
        {
            onSuccess: (data) => {
                setGroups(data.data);
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
                Crear nuevo grupo
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar grupo
            </button>
            {showModal && addOrDelete === "Agregar" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Nombre del grupo:</span>
                            <input
                                type="text"
                                value={groupName}
                                onChange={handleNameChange}
                                placeholder={``}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
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
                            <span className="text-gray-700">Nombre del Group:</span>
                            <select
                                value={groupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un grupo:</option>
                                {groups.map((Group) => (
                                    <option key={Group.Id} value={Group.Name}>
                                        {Group.Name}
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