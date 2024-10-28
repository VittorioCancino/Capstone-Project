import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateType } from "../../types";
import { CreateTypes } from "../../api/TypeApi";
import { CreateSKU } from "../../api/SKUApi";
import { CreateMaterial } from "../../api/MaterialApi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";

export default function Navbar({ setFilter }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [addOption, setAddOption] = useState("");
  const [productName, setProductName] = useState("");

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

  const queryClient = useQueryClient();

  const initialValues: CreateType = {
    Name: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateType>({ defaultValues: initialValues });

  // Define useMutation hooks for each creation function
  const { mutate: mutateType } = useMutation(CreateTypes, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tipo de Producto creado exitosamente");
      reset();
    },
  });

  const { mutate: mutateSKU } = useMutation(CreateSKU, {
    onError: (error: Error) => {toast.error(error.message);},
    onSuccess: () => {
      toast.success("Producto creado exitosamente");
      reset();
    },
  });

  const { mutate: mutateMaterial } = useMutation(CreateMaterial, {
    onError: (error: Error) => {toast.error(error.message);},
    onSuccess: () => {
      toast.success("Material de Producto creado exitosamente");
      reset();
    },
  });

  const HandleCreateType = (formData: CreateType) => {
    mutateType(formData);
  };

  const HandleCreateSKU = (formData: CreateType) => {
    mutateSKU(formData);
  };

  const HandleCreateMaterial = (formData: CreateType) => {
    mutateMaterial(formData);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setAddOption("");
    setProductName("");
  };
  const handleAddOptionChange = (event) => setAddOption(event.target.value);
  const handleNameChange = (event) => setProductName(event.target.value);

  const handleAddSubmit = () => {
    console.log(`Agregar: ${addOption} con nombre: ${productName}`);

    const formData: CreateType = { Name: productName };

    if (addOption === "Producto") {
      HandleCreateSKU(formData);
    } else if (addOption === "Tipo de Producto") {
      HandleCreateType(formData);
    } else if (addOption === "Material de Producto") {
      HandleCreateMaterial(formData);
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
              <img src="/bolsa-de-plastico-en-caida-libre.jpeg" alt="Logo" className="h-20 w-auto" />{" "}
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
                  <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                    <h4 className="font-semibold text-gray-700 underline mb-2">
                      Tipo de Material
                    </h4>
                    <ul className="space-y-1 text-left w-full">
                      <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                        Polietileno
                      </li>
                      <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                        Polipropileno
                      </li>
                    </ul>
                  </div>
                  <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                    <h4 className="font-semibold text-gray-700 underline mb-2">
                      Tipo de Producto
                    </h4>
                    <ul className="space-y-1 text-left w-full">
                      <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                        Bolsa
                      </li>
                      <li
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                        onClick={() => handleFilterClick("Bobina")}
                      >
                        Bobina
                      </li>
                    </ul>
                  </div>
                  <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                    <h4 className="font-semibold text-gray-700 underline mb-2">
                      Dimensiones
                    </h4>
                    <ul className="space-y-1 text-left w-full">
                      <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                        30x30x80
                      </li>
                      <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                        40x40x100
                      </li>
                    </ul>
                  </div>
                  <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                    <h4 className="font-semibold text-gray-700 underline mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={() => handleFilterClick("")}>
                      Limpiar Filtro
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={openModal}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Agregar
          </button>
        </nav>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Agregar Elemento</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Seleccione qué agregar:</span>
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

            {addOption && (
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
            )}

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
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
//TEST
