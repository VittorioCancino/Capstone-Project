import React from "react";
import StoresInfo from "./StoresInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import AllStores from "./AllStores";
import { GetAllTypes } from "../../api/TypeApi";
import { CreateType } from "../../types";
import { CreateTypes, RemoveTypes } from "../../api/TypeApi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const AddDeleteButton = () => {
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState("");
    const [addOrDelete, setAddOrDelete] = useState("");

    const initialValuesType: CreateType = {
        Name: "",
    };

    const {
        register: registerType,
        formState: { errors: errorsType },
        handleSubmit: handleSubmitType,
        reset: resetType,
    } = useForm<CreateType>({ defaultValues: initialValuesType });

    const { mutate: mutateType } = useMutation(CreateTypes, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("stores");
            toast.success("Tipo de Producto creado exitosamente");
            resetType();
        },
    });

    const { mutate: mutateTypeR } = useMutation(RemoveTypes, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("stores");
            toast.success("Tipo de Producto eliminado exitosamente");
            resetType();
        },
    });

    const handleAddOrDelete = (choiceValue) => {
        setAddOrDelete(choiceValue);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setProductName("");
    };

    const handleAddSubmit = () => {
        const formData: CreateType = { Name: productName };
        mutateType(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {
        const formData: CreateType = { Name: productName };
        mutateTypeR(formData);
        closeModal();
    };

    const handleNameChange = (event) => setProductName(event.target.value);

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
                Agregar
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar
            </button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-2">
                            <span className="text-gray-700">Bodegas:</span>
                        </label>


                        <label className="block mb-4">
                            <span className="text-gray-700">Nombre:</span>
                            <input
                                type="text"
                                value={productName}
                                onChange={handleNameChange}
                                placeholder={`Ingrese el nombre de la bodega`}
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
                                onClick={
                                    addOrDelete === "Agregar"
                                        ? handleAddSubmit
                                        : handleDeleteSubmit
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {addOrDelete === "Agregar" ? "Agregar" : "Eliminar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default AddDeleteButton;