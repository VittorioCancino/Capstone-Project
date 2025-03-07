import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateType, CreateMaterial, CreateProduct } from "../../types";
import { CreateTypes, RemoveTypes } from "../../api/TypeApi";
import { CreateProducts, RemoveProducts } from "../../api/ProductApi";
import { CreateMaterials, RemoveMaterials } from "../../api/MaterialApi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import AllMateriales from "./AllMateriales";
import AllTypes from "./AllTypes";

export default function Navbar({ setFilter }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [addOption, setAddOption] = useState("");
  const [productName, setProductName] = useState("");
  const [addOrDelete, setAddOrDelete] = useState("");
  const [productData, setProductData] = useState<CreateProduct | null>(null);
  const [material, setMaterial] = useState(productData?.Material || "");
  const [type, setType] = useState(productData?.Type || "");
  const [large, setLarge] = useState(productData?.Large || "");
  const [width, setWidth] = useState(productData?.Width || "");
  const [thickness, setThickness] = useState(productData?.Thickness || "");

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY, location.pathname]);

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  const handleAddOrDelete = (choiceValue) => {
    setAddOrDelete(choiceValue);
  };

  const queryClient = useQueryClient();

  const initialValuesType: CreateType = {
    Name: "",
  };

  const initialValuesMaterial: CreateMaterial = {
    Name: "",
  };

  const initialValuesProduct: CreateProduct = {
    Material: "",
    Type: "",
    Large: 1,
    Width: 1,
    Thickness: 1,
  };

  const {
    register: registerType,
    formState: { errors: errorsType },
    handleSubmit: handleSubmitType,
    reset: resetType,
  } = useForm<CreateType>({ defaultValues: initialValuesType });

  const {
    register: registerMaterial,
    formState: { errors: errorsMaterail },
    handleSubmit: handleSubmitMaterial,
    reset: resetMaterial,
  } = useForm<CreateMaterial>({ defaultValues: initialValuesMaterial });

  const {
    register: registerProduct,
    formState: { errors: errorsProduct },
    handleSubmit: handleSubmitProduct,
    reset: resetProduct,
  } = useForm<CreateProduct>({ defaultValues: initialValuesProduct });

  const { mutate: mutateType } = useMutation(CreateTypes, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tipo de Producto creado exitosamente");
      resetType();
    },
  });

  const { mutate: mutateTypeR } = useMutation(RemoveTypes, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tipo de Producto eliminado exitosamente");
      resetType();
    },
  });

  const HandleCreateType = (formData: CreateType) => {
    mutateType(formData);
  };

  const HandleRemoveType = (formData: CreateType) => {
    mutateTypeR(formData);
  };

  const { mutate: mutateProduct } = useMutation(CreateProducts, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Producto creado exitosamente");
      resetType();
    },
  });

  const { mutate: mutateProductR } = useMutation(RemoveProducts, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Producto creado exitosamente");
      resetType();
    },
  });

  const HandleCreateProduct = (formData: CreateProduct) => {
    mutateProduct(formData);
  };

  const HandleRemoveProduct = (formData: CreateProduct) => {
    mutateProductR(formData);
  };

  const { mutate: mutateMaterial } = useMutation(CreateMaterials, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Material de Producto creado exitosamente");
      resetMaterial();
    },
  });

  const { mutate: mutateMaterialR } = useMutation(RemoveMaterials, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Material de Producto eliminado exitosamente");
      resetMaterial();
    },
  });

  const HandleCreateMaterial = (formData: CreateMaterial) => {
    mutateMaterial(formData);
  };

  const HandleRemoveMaterial = (formData: CreateMaterial) => {
    mutateMaterialR(formData);
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setAddOption("");
    setProductName("");
  };

  const closeProductModal = () => {
    setShowModal(false);
    setAddOption("");
    setProductName("");
    setMaterial("");
    setType("");
    setLarge("");
    setWidth("");
    setThickness("");
  };

  const handleAddOptionChange = (event) => setAddOption(event.target.value);
  const handleNameChange = (event) => setProductName(event.target.value);
  const handleDataChange = (event) => setProductData(event.target.value);
  const handleMaterialChange = (e) => setMaterial(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleLargeChange = (e) => setLarge(e.target.value);
  const handleWidthChange = (e) => setWidth(e.target.value);
  const handleThicknessChange = (e) => setThickness(e.target.value);

  const handleAddSubmit = () => {
    console.log(`Agregar ${addOption} con nombre: ${productName}`);

    if (addOption === "Producto") {
      const formData: CreateProduct = {
        Material: material,
        Type: type,
        Large: Number(large),
        Width: Number(width),
        Thickness: Number(thickness),
      };
      HandleCreateProduct(formData);
      queryClient.invalidateQueries("products");
      closeProductModal();
    } else if (addOption === "Tipo de Producto") {
      const formData: CreateType = { Name: productName };
      HandleCreateType(formData);
    } else if (addOption === "Material de Producto") {
      const formData: CreateMaterial = { Name: productName };
      HandleCreateMaterial(formData);
    } else {
      console.error("Opción no válida seleccionada");
    }
    closeModal();
  };

  const handleDeleteSubmit = () => {
    console.log(`Borrar ${addOption} con nombre: ${productName}`);

    if (addOption === "Producto") {
      const formData: CreateProduct = {
        Material: material,
        Type: type,
        Large: Number(large),
        Width: Number(width),
        Thickness: Number(thickness),
      };
      HandleRemoveProduct(formData);
      queryClient.invalidateQueries("products");
      closeProductModal();
    } else if (addOption === "Tipo de Producto") {
      const formData: CreateType = { Name: productName };
      HandleRemoveType(formData);
    } else if (addOption === "Material de Producto") {
      const formData: CreateMaterial = { Name: productName };
      HandleRemoveMaterial(formData);
    } else {
      console.error("Opción no válida seleccionada");
    }
    closeModal();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-20 w-full bg-gray-100 shadow-md
        ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } transition-all duration-300`}
      >
        <nav className="flex items-center justify-between px-10 py-6">
          <div className="absolute left-0 px-4">
            <a href="/">
              <img
                src="/bolsa-de-plastico-en-caida-libre.jpeg"
                alt="Logo"
                className="h-20 w-auto"
              />{" "}
            </a>
          </div>

          <div className="flex items-center flex-grow mx-auto max-w-6xl">
            <input
              type="text"
              placeholder="Busca un producto por SKU..."
              className="flex-grow px-4 py-2 border-2 border-blue-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none"
            >
              Filtrar
              <span className="ml-2">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                <div className="flex justify-between space-x-16">
                  <AllMateriales filter={handleFilterClick} />
                  <AllTypes filter={handleFilterClick} />
                  <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                    <h4
                      className="font-semibold text-gray-700 underline mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => handleFilterClick("")}
                    >
                      Limpiar Filtro
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              openModal();
              handleAddOrDelete("Agregar");
            }}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Agregar
          </button>
          <button
            onClick={() => {
              openModal();
              handleAddOrDelete("Eliminar");
            }}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </nav>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Ingresar datos</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Seleccione categoría:</span>
              <select
                value={addOption}
                onChange={handleAddOptionChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Seleccione una opción...
                </option>
                <option value="Producto">Producto</option>
                <option value="Tipo de Producto">Tipo de Producto</option>
                <option value="Material de Producto">
                  Material de Producto
                </option>
              </select>
            </label>

            {addOption !== "Producto" ? (
              <label className="block mb-4">
                <span className="text-gray-700">Nombre:</span>
                <input
                  type="text"
                  value={productName}
                  onChange={handleNameChange}
                  placeholder={`Ingrese el nombre del ${addOption.toLowerCase()}`}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </label>
            ) : (
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <label className="block mb-4">
                  <span className="text-gray-700">Material:</span>
                  <input
                    type="text"
                    value={material}
                    onChange={handleMaterialChange}
                    placeholder="Ingrese el material"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Tipo:</span>
                  <input
                    type="text"
                    value={type}
                    onChange={handleTypeChange}
                    placeholder="Ingrese el tipo"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Largo:</span>
                  <input
                    type="number"
                    value={large}
                    onChange={handleLargeChange}
                    placeholder="Ingrese el largo"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Ancho:</span>
                  <input
                    type="number"
                    value={width}
                    onChange={handleWidthChange}
                    placeholder="Ingrese el ancho"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Grosor:</span>
                  <input
                    type="number"
                    value={thickness}
                    onChange={handleThicknessChange}
                    placeholder="Ingrese el grosor"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
              </form>
            )}

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
  );
}
//TEST
