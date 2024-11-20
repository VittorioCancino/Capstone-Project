import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { CreateProductArea, DeleteProductArea } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { CreateProductAreas, RemoveProductAreas, GetAllProductAreas } from "../../api/ProductAreaApi";
import { GetAllMaterials } from "../../api/MaterialApi";
import { GetAllTypes } from "../../api/TypeApi";
import AllMateriales from "./AllMateriales";
import AllTypes from "./AllTypes";
import { GetAllAreas } from "../../api/AreaApi";
import { GetAllProducts } from "../../api/ProductApi";


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

interface ProductArea {
    Id: number
    ProductId: number,
    AreaId: number,
    UID: string
}

interface Areas {
    Id: number,
    Name: string,
    WName: string,
    WarehouseId: number
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
    const [ProductAreas, setProductAreas] = useState<ProductArea[]>([]);
    const [Materials, setMaterials] = useState<Material[]>([]);
    const [Groups, setGroups] = useState<Group[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [areaId, setAreaId] = useState(0);
    const [productId, setProductId] = useState(0);
    const [productAreaId, setProductAreaId] = useState(0);
    const [areas, setAreas] = useState<Areas[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const initialValuesProduct: CreateProductArea = {
        AreaId: 0,
        ProductId: 0
    };

    const initialValuesProductD: DeleteProductArea = {
        ProductAreaId: 0
    };

    const {
        register: registerProduct,
        formState: { errors: errorsProduct },
        handleSubmit: handleSubmitProduct,
        reset: resetProduct,
    } = useForm<CreateProductArea>({ defaultValues: initialValuesProduct });

    const {
        register: registerProductD,
        formState: { errors: errorsProductD },
        handleSubmit: handleSubmitProductD,
        reset: resetProductD,
    } = useForm<DeleteProductArea>({ defaultValues: initialValuesProductD });

    const { mutate: mutateProduct } = useMutation(CreateProductAreas, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("productareas");
            toast.success("Product creado exitosamente");
            resetProduct();
        },
    });

    const { mutate: mutateProductR } = useMutation(RemoveProductAreas, {
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("productareas");
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

        const formData: CreateProductArea = {
            AreaId: areaId,
            ProductId: productId
        };
        mutateProduct(formData);
        closeModal();
    };

    const handleDeleteSubmit = () => {

        const formData: DeleteProductArea = {
            ProductAreaId: productAreaId
        };
        console.log(formData);
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

    const handleFilterClick = (filterValue: { ProductId?: number; AreaId?: number }) => {

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

    const { data: AreasData, error: AreasError, isError: isAreasError, isLoading: isAreasLoading, } = useQuery(
        "areas",
        GetAllAreas,
        {
            onSuccess: (data) => {
                setAreas(data.data);
            },
            onError: (error: Error) => {
                toast.error(error.message);
            },
        }
    );

    const { data: ProductAreasData, error: ProductAreasError, isError: isProductAreasError, isLoading: isProductAreasLoading, } = useQuery(
        "productareas",
        GetAllProductAreas,
        {
            onSuccess: (data) => {
                setProductAreas(data.data);
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
                Crear nueva distribución
            </button>

            {/* Botón Eliminar */}
            <button
                onClick={() => {
                    openModal();
                    handleAddOrDelete("Eliminar");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Eliminar distribución
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
                            <AllMateriales filter={(filterValue) => handleFilterClick({ ProductId: filterValue.ProductId })} />
                            <AllTypes filter={(filterValue) => handleFilterClick({ AreaId: filterValue.AreaId })} />
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
                            <span className="text-gray-700">Area:</span>
                            <select
                                value={areaId}
                                onChange={(e) => {
                                    setAreaId(parseInt(e.target.value));
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un area</option>
                                {areas.map((area) => (
                                    <option key={area.Id} value={area.Id}>
                                        {area.Name}
                                    </option>
                                ))}
                            </select>

                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Producto:</span>
                            <select
                                value={productId}
                                onChange={(e) => {
                                    setProductId(parseInt(e.target.value));
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione un producto</option>
                                {products.map((product) => (
                                    <option key={product.Id} value={product.Id}>
                                        {product.MaterialInfoName} {product.GroupInfoName} {product.Large}cm x {product.Width}cm x {product.Thickness}mc
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
                            <span className="text-gray-700">Nombre de la distribución:</span>
                            <select
                                value={productAreaId}
                                onChange={(e) => {
                                    setProductAreaId(parseInt(e.target.value));
                                }}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Seleccione una distribución:</option>
                                {ProductAreas.map((product) => (
                                    <option key={product.Id} value={product.Id}>
                                        UID: {product.UID}
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