import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { CreateProduct } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { CreateProducts, RemoveProducts, GetAllProducts } from "../../api/ProductApi";
import { GetAllMaterials } from "../../api/MaterialApi";
import { GetAllTypes } from "../../api/TypeApi";
import AllMateriales from "./AllMateriales";
import AllTypes from "./AllTypes";


interface Product {
    Id: number;
    Material: number;
    Type: number;
    Large: number | null;
    Width: number | null;
    Thickness: number | null;
    Quantity: number;
    MaterialInfoName: string;
    GroupInfoName: string;
}

interface Material {
    Id: number;
    Name: string;
}

interface Group {
    Id: number;
    Name: string;
}

const AddDeleteButton = ({ setFilter }) => {

    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState<Product[]>([]);
    const [MaterialName, setMaterialName] = useState("");
    const [GroupName, setGroupName] = useState("");
    const [large, setLarge] = useState<number | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [thickness, setThickness] = useState<number | null>(null);
    const [addOrDelete, setAddOrDelete] = useState("");
    const [Products, setProducts] = useState<Product[]>([]);
    const [Materials, setMaterials] = useState<Material[]>([]);
    const [Groups, setGroups] = useState<Group[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const initialValuesProduct: CreateProduct = {
        MaterialName: "",
        GroupName: "",
        ProductLarge: 0,
        ProductWidth: 0,
        ProductThickness: 0,
    };

    const initialValuesProductD: CreateProduct = {
        MaterialName: "",
        GroupName: "",
        ProductLarge: 0,
        ProductWidth: 0,
        ProductThickness: 0,
    };

    const {
        register: registerProduct,
        formState: { errors: errorsProduct },
        handleSubmit: handleSubmitProduct,
        reset: resetProduct,
    } = useForm<CreateProduct>({ defaultValues: initialValuesProduct });

    const {
        register: registerProductD,
        formState: { errors: errorsProductD },
        handleSubmit: handleSubmitProductD,
        reset: resetProductD,
    } = useForm<CreateProduct>({ defaultValues: initialValuesProductD });

    const { mutate: mutateProduct } = useMutation(CreateProducts, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("products");
            toast.success("Product creado exitosamente");
            resetProduct();
        },
    });

    const { mutate: mutateProductR } = useMutation(RemoveProducts, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("products");
            toast.success("Product eliminado exitosamente");
            resetProductD();
        },
    });

    const handleAddOrDelete = (choiceValue) => {
        setAddOrDelete(choiceValue);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setMaterialName("");
        setGroupName("");
        setLarge(null);
        setWidth(null);
        setThickness(null);
        setProductName([]);
    };

    const handleAddSubmit = () => {

        if (large === null || width === null || thickness === null) {
            console.error("Todos los campos deben tener un valor numérico");
            return;
        }

        const formData: CreateProduct = {
            MaterialName: MaterialName,
            GroupName: GroupName,
            ProductLarge: large,
            ProductWidth: width,
            ProductThickness: thickness,
        };
        mutateProduct(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {

        if (productName.length === 0) {
            console.error("No se ha seleccionado un producto");
            return;
        }

        const selectedProduct = productName[0];

        const formData: CreateProduct = {
            MaterialName: selectedProduct.MaterialInfoName,
            GroupName: selectedProduct.GroupInfoName,
            ProductLarge: selectedProduct.Large || 0,
            ProductWidth: selectedProduct.Width || 0,
            ProductThickness: selectedProduct.Thickness || 0,
        };
        mutateProductR(formData);
        closeModal();
    };

    const handleMaterialNameChange = (event) => setMaterialName(event.target.value);
    const handleMaterialNameChange2 = (value) => {
        setMaterialName(value);
    };
    const handleLargeChange = (event) => setLarge(event.target.value);
    const handleWidthChange = (event) => setWidth(event.target.value);
    const handleThicknessChange = (event) => setThickness(event.target.value);

    const handleFilterClick = (filterValue: { MaterialInfoName?: string; GroupInfoName?: string }) => {

        if (!Object.keys(filterValue).length) {
            setFilter({});
            return;
        }


        setFilter((prev) => ({
            ...prev,
            ...filterValue,
        }));
    };

    const { data: ProductsData, error: ProductsError, isError: isProductsError, isLoading: isProductsLoading, } = useQuery(
        "products",
        GetAllProducts,
        {
            onSuccess: (data) => {
                const mappedProducts = data.data.map((item) => ({
                    Id: item.Id,
                    Material: item.Material,
                    Type: item.Type,
                    Large: item.Large,
                    Width: item.Width,
                    Thickness: item.Thickness,
                    Quantity: item.Quantity,
                    MaterialInfoName: item["MaterialInfo.Name"],
                    GroupInfoName: item["GroupInfo.Name"],
                }));
                setProducts(mappedProducts);
            },
            onError: (error: Error) => {
                toast.error(error.message);
            },
        }
    );

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
                Crear nuevo producto
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar producto
            </button>
            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none"
                >
                    Filtrar
                    <span className="ml-2">▼</span>
                </button>


                {showDropdown && (
                    <div className="absolute mt-4 translate-x-4 w-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                        <div className="flex justify-between space-x-16">
                            <AllMateriales filter={(filterValue) => handleFilterClick({ MaterialInfoName: filterValue.MaterialInfoName })} />
                            <AllTypes filter={(filterValue) => handleFilterClick({ GroupInfoName: filterValue.GroupInfoName })} />
                            <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                                <h4
                                    className="font-semibold text-gray-700 underline mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                                    onClick={() => handleFilterClick({})}
                                >
                                    Limpiar Filtro
                                </h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && addOrDelete === "Agregar" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Material del producto:</span>
                            <select
                                value={MaterialName}
                                onChange={(e) => {
                                    setMaterialName(e.target.value);
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un material</option>
                                {Materials.map((Material) => (
                                    <option key={Material.Id} value={Material.Name}>
                                        {Material.Name}
                                    </option>
                                ))}
                            </select>

                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Grupo del producto:</span>
                            <select
                                value={GroupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un grupo</option>
                                {Groups.map((Group) => (
                                    <option key={Group.Id} value={Group.Name}>
                                        {Group.Name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Largo:</span>
                            <input
                                type="number"
                                value={large ?? ""}
                                onChange={handleLargeChange}
                                placeholder={`XX cm`}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Ancho:</span>
                            <input
                                type="number"
                                value={width ?? ""}
                                onChange={handleWidthChange}
                                placeholder={`XX cm`}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Grosor:</span>
                            <input
                                type="number"
                                value={thickness ?? ""}
                                onChange={handleThicknessChange}
                                placeholder={`XX mc`}
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
                            <span className="text-gray-700">Nombre del Product:</span>
                            <select
                                value={productName.length > 0 ? productName[0].Id : ""}
                                onChange={(e) => {
                                    const selectedProduct = Products.find((product) => product.Id === parseInt(e.target.value, 10));
                                    console.log(selectedProduct);
                                    if (selectedProduct) {
                                        setProductName([selectedProduct]);
                                    }
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un producto:</option>
                                {Products.map((product) => (
                                    <option key={product.Id} value={product.Id}>
                                        SKU: {product.MaterialInfoName} {product.GroupInfoName} {product.Large}cm x {product.Width}cm x {product.Thickness}mc
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