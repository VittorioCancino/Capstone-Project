import React, { useState } from "react";
import { AddStocks, RemoveStocks } from "../../api/StockApi";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { GetAllAreas } from "../../api/AreaApi";
import { GetAllProducts } from "../../api/ProductApi";
import { toast } from "react-toastify";
import { GetAllStocks } from "../../api/StockApi";
import { AddStock } from "../../types";
import { useForm } from "react-hook-form";

interface ProductArea {
  Id: number
  ProductId: number,
  AreaId: number,
  UID: string,
  Quantity: number,
}

interface Areas {
  Id: number,
  Name: string,
  WName: string,
  WarehouseId: number
}

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

interface Stock {
  Id: number;
  ProductAreaId: number;
  Quantity: number;
}

const ProductList = ({ products }) => {

  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductArea | null>(null);
  const [selectedAction, setSelectedAction] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [filterArea, setFilterArea] = useState(null);
  const [filterProd, setFilterProd] = useState(null);
  const [filterStock, setFilterStock] = useState(null);
  const [areas, setAreas] = useState<Areas[]>([]);
  const [productsL, setProductsL] = useState<Product[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [quantityChange, setQuantityChange] = useState(0);

  const queryClient = useQueryClient();


  const initialValuesAdd: AddStock = {
    StockId: 0,
    Quantity: 0
  };

  const {
    register: registerProductD,
    formState: { errors: errorsProductD },
    handleSubmit: handleSubmitProductD,
    reset: resetProductD,
  } = useForm<AddStock>({ defaultValues: initialValuesAdd });

  const { mutate: mutateAdd } = useMutation(AddStocks, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("stocks");
      toast.success("Product eliminado exitosamente");
      resetProductD();
    },
  });

  const { mutate: mutateRemove } = useMutation(RemoveStocks, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("stocks");
      toast.success("Product eliminado exitosamente");
      resetProductD();
    },
  });

  const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
    setFilterArea(product.AreaId);
    setFilterProd(product.ProductId);
    setFilterStock(product.Id);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);

  };

  const openUpdate = (action) => {
    setShowUpdate(true);
    setSelectedAction(action);
  };
  const closeUpdate = () => {
    setShowUpdate(false);
  };

  const handleAddSubmit = (stockId) => {
    const formData: AddStock = {
      StockId: stockId,
      Quantity: quantityChange
    }; console.log(formData);
    mutateAdd(formData);
    closeModal();
  };

  const handleRemoveSubmit = (stockId) => {
    const formData: AddStock = {
      StockId: stockId,
      Quantity: quantityChange
    };
    mutateRemove(formData);
    closeModal();
  };

  const { data: dataArea, error: errorArea, isError: isErrorArea, isLoading: isLoadingArea } = useQuery(
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

  const filteredAreas = filterArea
    ? areas.filter((areas) => areas.Id === filterArea)
    : areas;



  const { data: dataProduct, error: errorProduct, isError: isErrorProduct, isLoading: isLoadingProduct } = useQuery(
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
        setProductsL(mappedProducts);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  const filteredProducts = filterProd
    ? productsL.filter((prod) => prod.Id === filterProd)
    : productsL;

  const { data, error, isError, isLoading } = useQuery(
    "stocks",
    GetAllStocks,
    {
      onSuccess: (data) => {
        setStocks(data.data);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  const filteredStock = filterStock
    ? stocks.filter((prod) => prod.ProductAreaId === filterStock)
    : stocks;

  return (
    <>
      <div className="flex flex-col space-y-2">
        {products
          .sort((a, b) => a.Id - b.Id)
          .map((product) => {

            const filteredStockTemp = stocks.filter((prod) => prod.ProductAreaId === product.Id);
            const quantity = filteredStockTemp.length > 0 ? filteredStockTemp[0].Quantity : 0;

            return (
              <div
                key={product.Id}
                className="flex justify-between items-center border p-4 rounded-lg shadow-md"
              >
                <span className="text-gray-700">ID: {product.Id}</span>
                <span className="text-black-700">UID: {product.UID}</span>
                <span className="text-gray-700">Existencias: {quantity}</span>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => openModal(product)}
                >
                  Ver detalle
                </button>
              </div>
            );
          })}
      </div>
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              UID: {selectedProduct.UID}
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
              <li>ID de la disposición: {selectedProduct.Id}</li>
              <li>Area: {filteredAreas[0].Name}</li>
              <li>Producto: {filteredProducts[0].MaterialInfoName} {filteredProducts[0].GroupInfoName} {filteredProducts[0].Large}cm x {filteredProducts[0].Width}cm x {filteredProducts[0].Thickness}mc</li>
              <li>Existencias: {filteredStock[0].Quantity}</li>
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => openUpdate(true)}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Aumentar existencias
              </button>
              <button
                onClick={() => openUpdate(false)}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Reducir existencias
              </button>
              <button
                onClick={closeModal}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {showUpdate && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {selectedAction === true
                ? "¿Cuanto desea agregar a las existencias?"
                : "¿Cuanto desea reducir de las existencias?"}
            </h2>
            <input
              type="number"
              value={quantityChange || ""}
              onChange={(e) => setQuantityChange(parseInt(e.target.value))}
              placeholder="Ingrese la cantidad"
              className="block w-full mt-2 p-2 border border-gray-300 rounded"
            />
            <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700"></ul>
            <div className="flex justify-end space-x-4">
              {selectedAction === true ? (
                <button
                  onClick={() => {
                    closeUpdate();
                    closeModal();
                    handleAddSubmit(selectedProduct.Id);
                  }}
                  className="ml-4 px-4 py-2 text-black rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Agregar
                </button>
              ) : (
                <button
                  onClick={() => {
                    closeUpdate();
                    closeModal();
                    handleRemoveSubmit(selectedProduct.Id);
                  }}
                  className="ml-4 px-4 py-2 text-black rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Reducir
                </button>
              )}

              <button
                onClick={closeUpdate}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
