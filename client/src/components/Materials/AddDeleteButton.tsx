import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { CreateMaterial } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { CreateMaterials, RemoveMaterials, GetAllMaterials } from "../../api/MaterialApi";


interface Material {
    Id: number;
    Name: string;
}

const AddDeleteButton = () => {

    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [MaterialName, setMaterialName] = useState("");
    const [addOrDelete, setAddOrDelete] = useState("");
    const [Materials, setMaterials] = useState<Material[]>([]);

    const initialValuesMaterial: CreateMaterial = {
        MaterialName: "",
        GroupName: "",
    };

    const initialValuesMaterialD: CreateMaterial = {
        MaterialName: "",
        GroupName: "",
    };

    const {
        register: registerMaterial,
        formState: { errors: errorsMaterial },
        handleSubmit: handleSubmitMaterial,
        reset: resetMaterial,
    } = useForm<CreateMaterial>({ defaultValues: initialValuesMaterial });

    const {
        register: registerMaterialD,
        formState: { errors: errorsMaterialD },
        handleSubmit: handleSubmitMaterialD,
        reset: resetMaterialD,
    } = useForm<CreateMaterial>({ defaultValues: initialValuesMaterialD });

    const { mutate: mutateMaterial } = useMutation(CreateMaterials, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("materials");
            toast.success("Material creado exitosamente");
            resetMaterial();
        },
    });

    const { mutate: mutateMaterialR } = useMutation(RemoveMaterials, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("materials");
            toast.success("Material eliminado exitosamente");
            resetMaterialD();
        },
    });

    const handleAddOrDelete = (choiceValue) => {
        setAddOrDelete(choiceValue);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setMaterialName("");
    };

    const handleAddSubmit = () => {
        const formData: CreateMaterial = {
            MaterialName: MaterialName,
            GroupName: "",
        };
        mutateMaterial(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {
        const formData: CreateMaterial = {
            MaterialName: MaterialName,
            GroupName: "",
        };
        mutateMaterialR(formData);
        closeModal();
    };

    const handleNameChange = (event) => setMaterialName(event.target.value);
    const handleNameChange2 = (value) => {
        setMaterialName(value);
    };

    const { data: MaterialsData, error: MaterialsError, isError: isMaterialsError, isLoading: isMaterialsLoading, } = useQuery(
        "materials",
        GetAllMaterials,
        {
            onSuccess: (data) => {
                setMaterials(data.data);
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
                Crear nuevo material
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar material
            </button>
            {showModal && addOrDelete === "Agregar" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Nombre del material:</span>
                            <input
                                type="text"
                                value={MaterialName}
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
                            <span className="text-gray-700">Nombre del material:</span>
                            <select
                                value={MaterialName}
                                onChange={(e) => {
                                    setMaterialName(e.target.value);
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un material:</option>
                                {Materials.map((Material) => (
                                    <option key={Material.Id} value={Material.Name}>
                                        {Material.Name}
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