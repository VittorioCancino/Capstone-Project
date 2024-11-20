import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { GetAllMaterials } from "../../api/MaterialApi";
import { GetAllProducts } from "../../api/ProductApi";

interface Material {
  Id: number;
  Name: string;
}

interface AllMaterialsProps {
  filter: (filterValue: { ProductId?: number }) => void;
}

interface Product {
  Id: number;
  Material: number;
  Type: number;
  Large: number;
  Width: number;
  Thickness: number;
  Quantity: number;
  MaterialInfoName: string;
  GroupInfoName: string
}

const AllMateriales: React.FC<AllMaterialsProps> = ({ filter }) => {

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);


  const handleClick = (id: number) => {
    setSelectedId(id);
    filter({ ProductId: id });
  };

  const { data, error, isError, isLoading } = useQuery(
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
      <h4 className="font-semibold text-gray-700 underline mb-2">
        Tipo de Material
      </h4>
      <ul className="space-y-1 text-left w-full">
        {products.map((product) => (
          <li
            key={product.Id}
            className={`cursor-pointer px-2 py-1 rounded ${selectedId === product.Id ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            onClick={() => handleClick(product.Id)}
          >
            {product.MaterialInfoName} {product.GroupInfoName} {product.Large}cm x {product.Width}cm x {product.Thickness}mc
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMateriales;
