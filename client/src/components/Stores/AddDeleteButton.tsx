import React from "react";
import StoresInfo from "./StoresInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import AllStores from "./AllStores";
import { CreateWarehouse } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { CreateWarehouses, RemoveWarehouses } from "../../api/WarehouseApi";

const AddDeleteButton = () => {

    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddres] = useState("");
    const [storeManager, setStoreManager] = useState("");
    const [storePhone, setStorePhone] = useState("");
    const [storeEmail, setStoreEmail] = useState("");
    const [storeSchedule, setStoreSchedule] = useState("");
    const [addOrDelete, setAddOrDelete] = useState("");

    const initialValuesType: CreateWarehouse = {
        WarehouseName: "",
        WarehouseAdress: "",
        WarehouseManager: "",
        WarehousePhone: "",
        WarehouseEmail: "",
        WarehouseSchedule: ""
    };

    const {
        register: registerWarehouse,
        formState: { errors: errorsType },
        handleSubmit: handleSubmitWarehouse,
        reset: resetType,
    } = useForm<CreateWarehouse>({ defaultValues: initialValuesType });

    const { mutate: mutateWarehouse } = useMutation(CreateWarehouses, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("stores");
            toast.success("Tipo de Producto creado exitosamente");
            resetType();
        },
    });

    const { mutate: mutateWarehouseR } = useMutation(RemoveWarehouses, {
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
        setStoreName("");
    };

    const handleAddSubmit = () => {
        const formData: CreateWarehouse = {
            WarehouseName: storeName,
            WarehouseAdress: storeAddress,
            WarehouseManager: storeManager,
            WarehousePhone: storePhone,
            WarehouseEmail: storeEmail,
            WarehouseSchedule: storeSchedule
        };
        mutateWarehouse(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {
        const formData: CreateWarehouse = {
            WarehouseName: storeName,
            WarehouseAdress: storeAddress,
            WarehouseManager: storeManager,
            WarehousePhone: storePhone,
            WarehouseEmail: storeEmail,
            WarehouseSchedule: storeSchedule
        };
        mutateWarehouseR(formData);
        closeModal();
    };

    const handleNameChange = (event) => setStoreName(event.target.value);
    const handleAddressChange = (event) => setStoreAddres(event.target.value);
    const handleManagerChange = (event) => setStoreManager(event.target.value);
    const handlePhoneChange = (event) => setStorePhone(event.target.value);
    const handleEmailChange = (event) => setStoreEmail(event.target.value);
    const handleScheduleChange = (event) => setStoreSchedule(event.target.value);


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
                Crear nueva bodega
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar bodega
            </button>
            {showModal && addOrDelete === "Agregar" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Nombre de la bodega:</span>
                            <input
                                type="text"
                                value={storeName}
                                onChange={handleNameChange}
                                placeholder={``}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700 block mt-6">Dirección de la bodega:</span>
                            <input
                                type="text"
                                value={storeAddress}
                                onChange={handleAddressChange}
                                placeholder={``}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700 block mt-6">Encargado de la bodega:</span>
                            <input
                                type="text"
                                value={storeManager}
                                onChange={handleManagerChange}
                                placeholder={``}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700 block mt-6">Teléfono de la bodega:</span>
                            <input
                                type="text"
                                value={storePhone}
                                onChange={handlePhoneChange}
                                placeholder={`Número telefónico`}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700 block mt-6">Email de la bodega:</span>
                            <input
                                type="text"
                                value={storeEmail}
                                onChange={handleEmailChange}
                                placeholder={`example@mail.com`}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700 block mt-6">Horarios de la bodega:</span>
                            <input
                                type="text"
                                value={storeSchedule}
                                onChange={handleScheduleChange}
                                placeholder={`08:00-18:00`}
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
                            <span className="text-gray-700">Nombre de la bodega:</span>
                            <input
                                type="text"
                                value={storeName}
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